import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('Resume Analysis end-to-end: upload PDF, call API, display results', async ({ page }) => {
  test.setTimeout(60000);

  const resumePath = 'C:\\Users\\anshu\\OneDrive\\Desktop\\resume.pdf';

  expect(
    fs.existsSync(resumePath),
    `Test PDF nahi mila: ${resumePath}`
  ).toBeTruthy();

  const pageErrors = [];
  const consoleErrors = [];

  page.on('pageerror', error => pageErrors.push(error.message));

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.addInitScript(() => {
    localStorage.setItem('skillbridge_logged_in', 'true');
    localStorage.setItem(
      'skillbridge_user',
      JSON.stringify({
        name: 'E2E Test User',
        email: 'e2e@example.com'
      })
    );
  });

  await page.goto('http://127.0.0.1:5173/resume-analysis', {
    waitUntil: 'domcontentloaded'
  });

  const fileInput = page.locator('input[type="file"]').first();
  await expect(fileInput).toBeAttached({ timeout: 15000 });

  await fileInput.setInputFiles(resumePath);
  console.log('PASS: PDF file selected');

  const buttonLabels = (await page.getByRole('button').allTextContents())
    .map(text => text.trim())
    .filter(Boolean);

  console.log('Page buttons:', buttonLabels);

  const analyzeButton = page
    .getByRole('button', {
      name: /analy[sz]e.*resume|analy[sz]e|check resume/i
    })
    .last();

  await expect(analyzeButton).toBeVisible({ timeout: 10000 });
  await expect(analyzeButton).toBeEnabled({ timeout: 10000 });

  const apiResponsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/resume/analyze') &&
      response.request().method() === 'POST',
    { timeout: 30000 }
  );

  await analyzeButton.click();

  const apiResponse = await apiResponsePromise;
  const status = apiResponse.status();
  const payload = await apiResponse.json();

  console.log('API HTTP status:', status);
  console.log('API success:', payload.success);
  console.log('Analysis data:', JSON.stringify(payload.analysis, null, 2));

  expect(status).toBe(200);
  expect(payload.success).toBe(true);
  expect(payload.analysis).toBeTruthy();

  const results = page.locator('.resume-results');
  await expect(results).toBeVisible({ timeout: 20000 });
  await expect(page.locator('.resume-score-card').first()).toBeVisible({
    timeout: 15000
  });

  console.log('UI results:', (await results.innerText()).slice(0, 2500));

  expect(pageErrors, 'Frontend uncaught errors').toEqual([]);

  console.log('PASS: PDF upload, backend analysis and UI results verified.');
  console.log('Browser console errors:', JSON.stringify(consoleErrors));
});
