import { expect, test } from '@playwright/test';

test.describe('sign in page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signIn');
  });

  test('should render sign in form', async ({ page }) => {
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Пароль')).toBeVisible();
  });
});
