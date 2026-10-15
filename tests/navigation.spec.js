import { test, expect } from '@playwright/test'

test.describe('SkillBridge AI Navigation', () => {
  test('Navbar navigation should work', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('body')).toBeVisible()

    // Login
    const loginLink = page.getByRole('link', { name: /login/i }).first()

    if (await loginLink.count()) {
      await loginLink.click()
      await expect(page).toHaveURL(/\/login/)
      await page.goto('/')
    }

    // Signup
    const signupLink = page.getByRole('link', { name: /sign up|signup/i }).first()

    if (await signupLink.count()) {
      await signupLink.click()
      await expect(page).toHaveURL(/\/signup/)
    }
  })

  test('Protected sidebar navigation should work', async ({ page }) => {
    // Create a logged-in state for testing protected pages
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

    await page.goto('/dashboard')

    await expect(page.locator('body')).toBeVisible()

    const routes = [
      { name: /dashboard/i, path: '/dashboard' },
      { name: /career analysis/i, path: '/career-analysis' },
      { name: /skills|my skills/i, path: '/skills' },
      { name: /roadmap/i, path: '/roadmap' },
      { name: /progress/i, path: '/progress' },
      { name: /settings/i, path: '/settings' },
      { name: /github analysis/i, path: '/github-analysis' },
      { name: /resume analysis/i, path: '/resume-analysis' },
    ]

    for (const route of routes) {
      const link = page.getByRole('link', { name: route.name }).first()

      if (await link.count()) {
        await link.click()
        await expect(page).toHaveURL(new RegExp(route.path))
      }
    }
  })
})