import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  use: {
    baseURL: 'http://localhost:5173',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: 'list',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
})