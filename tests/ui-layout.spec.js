import { test, expect } from '@playwright/test'

const protectedRoutes = [
  '/dashboard',
  '/career-analysis',
  '/skills',
  '/roadmap',
  '/progress',
  '/settings',
  '/github-analysis',
  '/resume-analysis',
]

const desktopViewport = {
  width: 1440,
  height: 900,
}

const tabletViewport = {
  width: 768,
  height: 1024,
}

const mobileViewport = {
  width: 390,
  height: 844,
}

test.describe('SkillBridge AI UI Layout', () => {
  test.beforeEach(async ({ page }) => {
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
  })

  // --------------------------------------------------
  // EXISTING DESKTOP ROUTE CHECKS
  // --------------------------------------------------

  for (const route of protectedRoutes) {
    test(`Layout check: ${route}`, async ({ page }) => {
      await page.setViewportSize(desktopViewport)

      await page.goto(route)

      await expect(page.locator('body')).toBeVisible()

      // Check for horizontal overflow
      const horizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1
      })

      expect(
        horizontalOverflow,
        `Horizontal overflow detected on ${route}`
      ).toBe(false)

      // Check that the main page is not completely blank
      const bodyText = await page.locator('body').innerText()

      expect(
        bodyText.trim().length,
        `Page appears empty on ${route}`
      ).toBeGreaterThan(20)

      // Check that viewport is actually being used
      const viewportWidth = await page.evaluate(() => window.innerWidth)

      expect(viewportWidth).toBe(1440)

      // Take screenshot for visual inspection
      await page.screenshot({
        path: `test-results/ui-${route.slice(1).replaceAll('/', '-') || 'home'}.png`,
        fullPage: true,
      })
    })
  }

  // --------------------------------------------------
  // MOBILE LAYOUT
  // --------------------------------------------------

  test('Mobile layout should not have horizontal overflow', async ({ page }) => {
    await page.setViewportSize(mobileViewport)

    await page.goto('/dashboard')

    await expect(page.locator('body')).toBeVisible()

    const horizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1
    })

    expect(
      horizontalOverflow,
      'Horizontal overflow detected on mobile dashboard'
    ).toBe(false)

    const viewportWidth = await page.evaluate(() => window.innerWidth)

    expect(viewportWidth).toBe(390)

    await page.screenshot({
      path: 'test-results/responsive-mobile-dashboard.png',
      fullPage: true,
    })
  })

  // --------------------------------------------------
  // TABLET LAYOUT
  // --------------------------------------------------

  test('Tablet layout should not have horizontal overflow', async ({ page }) => {
    await page.setViewportSize(tabletViewport)

    await page.goto('/dashboard')

    await expect(page.locator('body')).toBeVisible()

    const horizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1
    })

    expect(
      horizontalOverflow,
      'Horizontal overflow detected on tablet dashboard'
    ).toBe(false)

    const viewportWidth = await page.evaluate(() => window.innerWidth)

    expect(viewportWidth).toBe(768)

    await page.screenshot({
      path: 'test-results/responsive-tablet-dashboard.png',
      fullPage: true,
    })
  })

  // --------------------------------------------------
  // MOBILE CHECK FOR ALL PROTECTED PAGES
  // --------------------------------------------------

  for (const route of protectedRoutes) {
    test(`Mobile layout check: ${route}`, async ({ page }) => {
      await page.setViewportSize(mobileViewport)

      await page.goto(route)

      await expect(page.locator('body')).toBeVisible()

      const horizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1
      })

      expect(
        horizontalOverflow,
        `Horizontal overflow detected on mobile ${route}`
      ).toBe(false)

      const bodyText = await page.locator('body').innerText()

      expect(
        bodyText.trim().length,
        `Mobile page appears empty on ${route}`
      ).toBeGreaterThan(20)

      await page.screenshot({
        path: `test-results/mobile-${route.slice(1).replaceAll('/', '-')}.png`,
        fullPage: true,
      })
    })
  }

  // --------------------------------------------------
  // SIDEBAR CHECK
  // --------------------------------------------------

  test('Desktop sidebar should be visible on protected pages', async ({
    page,
  }) => {
    await page.setViewportSize(desktopViewport)

    await page.goto('/dashboard')

    await expect(page.locator('body')).toBeVisible()

    // Look for common sidebar selectors used by the project
    const sidebar = page.locator(
      'aside, .sidebar, .dashboard-sidebar, [class*="sidebar"]'
    ).first()

    await expect(
      sidebar,
      'Sidebar was not found on desktop dashboard'
    ).toBeVisible()

    const sidebarBox = await sidebar.boundingBox()

    expect(
      sidebarBox,
      'Sidebar does not have a visible bounding box'
    ).not.toBeNull()

    expect(
      sidebarBox?.width,
      'Sidebar width is too small on desktop'
    ).toBeGreaterThan(100)

    await page.screenshot({
      path: 'test-results/sidebar-desktop-dashboard.png',
      fullPage: true,
    })
  })

  // --------------------------------------------------
  // SIDEBAR NAVIGATION CHECK
  // --------------------------------------------------

 test('Sidebar navigation links should remain available', async ({
  page,
}) => {
  await page.setViewportSize(desktopViewport)

  await page.goto('/dashboard')

  await expect(page.locator('body')).toBeVisible()

  const expectedNavigation = [
    '/dashboard',
    '/skills',
    '/roadmap',
    '/career-analysis',
    '/github-analysis',
    '/progress',
    '/settings',
  ]

  for (const href of expectedNavigation) {
    const navigationItem = page.locator(
      `.dashboard-sidebar a[href="${href}"], .app-sidebar a[href="${href}"]`
    ).first()

    await expect(
      navigationItem,
      `Sidebar navigation link "${href}" is missing`
    ).toBeVisible()
  }
})
  // --------------------------------------------------
  // SIDEBAR PERSISTENCE CHECK
  // --------------------------------------------------

  test('Sidebar should remain visible after navigation', async ({ page }) => {
    await page.setViewportSize(desktopViewport)

    await page.goto('/dashboard')

    const sidebar = page.locator(
      'aside, .sidebar, .dashboard-sidebar, [class*="sidebar"]'
    ).first()

    await expect(sidebar).toBeVisible()

    await page.goto('/skills')

    await expect(sidebar).toBeVisible()

    await page.goto('/settings')

    await expect(sidebar).toBeVisible()

    await page.goto('/github-analysis')

    await expect(sidebar).toBeVisible()

    await page.goto('/resume-analysis')

    await expect(sidebar).toBeVisible()
  })
})
