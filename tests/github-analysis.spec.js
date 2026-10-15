import { test, expect } from '@playwright/test'

test('GitHub Analysis should analyze a GitHub username', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('skillbridge_logged_in', 'true')
    localStorage.setItem(
      'skillbridge_user',
      JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
      })
    )
  })

  await page.goto('/github-analysis')

  await expect(page.locator('body')).toBeVisible()

  // Find the username input
  const usernameInput = page.locator(
    'input[placeholder*="GitHub" i], input[name*="username" i], input[type="text"]'
  ).first()

  await expect(usernameInput).toBeVisible()

  // Use a public GitHub username for testing
  await usernameInput.fill('torvalds')

  // Find and click the analysis button
  const analyzeButton = page.getByRole('button', {
    name: /analy[sz]e/i,
  }).first()

  await expect(analyzeButton).toBeVisible()

  await analyzeButton.click()

  // Wait for the API result
  await expect(
    page.getByText(/github|repositories|technologies|score/i).first()
  ).toBeVisible({
    timeout: 30000,
  })

  // Page should remain functional after analysis
  await expect(page.locator('body')).toBeVisible()
})