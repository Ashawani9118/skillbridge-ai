import { test, expect } from '@playwright/test';

test('GitHub Analysis end-to-end: API and UI results', async ({ page }) => {
  test.setTimeout(60000);

  const pageErrors = [];
  const consoleErrors = [];

  page.on('pageerror', error => pageErrors.push(error.message));

  page.on('console', message => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('requestfailed', request => {
    if (request.url().includes('/api/github/analyze/')) {
      console.log('FAILED API REQUEST:', request.url(), request.failure()?.errorText);
    }
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

  await page.goto('http://127.0.0.1:5173/github-analysis', {
    waitUntil: 'domcontentloaded'
  });

  await expect(page.getByText(/github profile analysis/i).first())
    .toBeVisible({ timeout: 15000 });

  const usernameInput = page.locator('input').first();
  await expect(usernameInput).toBeVisible({ timeout: 10000 });
  await usernameInput.fill('octocat');

  console.log('PASS: GitHub username entered');

  const analyzeButton = page.getByRole('button', {
    name: /analyze profile/i
  });

  await expect(analyzeButton).toBeVisible();
  await expect(analyzeButton).toBeEnabled();

  const apiResponsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/github/analyze/') &&
      response.request().method() === 'GET',
    { timeout: 30000 }
  );

  await analyzeButton.click();

  const apiResponse = await apiResponsePromise;
  const status = apiResponse.status();
  const payload = await apiResponse.json();

  console.log('API HTTP status:', status);
  console.log('API success:', payload.success);

  expect(status).toBe(200);
  expect(payload.success).toBe(true);
  expect(payload.data).toBeTruthy();
  expect(payload.data.profile.username.toLowerCase()).toBe('octocat');
  expect(Array.isArray(payload.data.skills)).toBe(true);
  expect(Array.isArray(payload.data.existingProjects)).toBe(true);
  expect(Array.isArray(payload.data.projectSuggestions)).toBe(true);
  expect(payload.data.projectLevel).toBeTruthy();

  console.log('PASS: Backend returned GitHub profile and analysis data');
  console.log('Profile:', payload.data.profile.name);
  console.log('Repositories analyzed:', payload.data.existingProjects.length);
  console.log('Skills detected:', payload.data.skills.join(', '));
  console.log('Project level:', payload.data.projectLevel.level);
  console.log('Project score:', payload.data.projectLevel.score);
  console.log('Suggestions:', payload.data.projectSuggestions.length);

  const results = page.locator('.github-results');
  await expect(results).toBeVisible({ timeout: 20000 });
  await expect(results).toContainText(/octocat|the octocat/i);

  console.log('PASS: GitHub analysis results visible in frontend');
  console.log('UI result preview:', (await results.innerText()).slice(0, 2000));

  expect(pageErrors, 'Frontend uncaught errors').toEqual([]);

  console.log('Browser console errors:', JSON.stringify(consoleErrors));
  console.log('GITHUB ANALYSIS E2E: ALL CHECKS PASSED');
});
