import { expect, test } from '@playwright/test'

test.describe('public smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('scholarships catalog loads', async ({ page }) => {
    await page.goto('/scholarships')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })
})
