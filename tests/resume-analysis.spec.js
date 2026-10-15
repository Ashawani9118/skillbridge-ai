import { test, expect } from '@playwright/test'

test('Resume Analysis should upload and analyze a resume', async ({ page }) => {
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

  await page.goto('/resume-analysis')

  await expect(page.locator('body')).toBeVisible()

  // Check that the resume upload page is visible
  await expect(
    page.getByText(/resume/i).first()
  ).toBeVisible()

  // Use the existing test resume from the project
  const resumePath = 'C:\\Users\\anshu\\OneDrive\\Desktop\\resume.pdf'

  const fileInput = page.locator('input[type="file"]').first()

  await expect(fileInput).toBeAttached()

  await fileInput.setInputFiles(resumePath)

  // Wait for analysis result
  await expect(
    page.getByText(/analysis|score|excellent/i).first()
  ).toBeVisible({
    timeout: 30000,
  })

  // Make sure the page did not crash
  await expect(page.locator('body')).toBeVisible()
})