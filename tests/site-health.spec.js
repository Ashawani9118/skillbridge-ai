import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/login',
  '/signup',
  '/dashboard',
  '/career-analysis',
  '/skills',
  '/roadmap',
  '/progress',
  '/settings',
  '/github-analysis',
  '/resume-analysis',
]

for (const route of routes) {
  test(`Page health check: ${route}`, async ({ page }) => {
    const consoleErrors = []
    const pageErrors = []

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
    })

    page.on('pageerror', (error) => {
      pageErrors.push(error.message)
    })

    const response = await page.goto(route, {
      waitUntil: 'networkidle',
    })

    expect(response).not.toBeNull()
    expect(response.status()).toBeLessThan(400)

    await expect(page.locator('body')).toBeVisible()

    if (consoleErrors.length > 0) {
      throw new Error(
        `Console errors on ${route}:\n${consoleErrors.join('\n')}`
      )
    }

    if (pageErrors.length > 0) {
      throw new Error(
        `Page errors on ${route}:\n${pageErrors.join('\n')}`
      )
    }
  })
}