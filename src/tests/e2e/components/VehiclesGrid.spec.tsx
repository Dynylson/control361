import { test, expect } from '@playwright/test';

test('should display vehicles in the grid', async ({ page }) => {
  await page.goto(process.env.VITE_BASE_URL_API || 'http://localhost:5173');

  const table = await page.locator('table');
  await expect(table).toBeVisible({ timeout: 30000 });

  const firstVehicle = await page.locator('thead tr:first-child');
  await expect(firstVehicle).toContainText('Placa');
  await expect(firstVehicle).toContainText('Frota');
  await expect(firstVehicle).toContainText('Tipo');
  await expect(firstVehicle).toContainText('Modelo');
  await expect(firstVehicle).toContainText('Status');
});

test('should show loading spinner while fetching vehicles', async ({ page }) => {
  await page.goto(process.env.VITE_BASE_URL_API || 'http://localhost:5173');

  const loadingSpinner = await page.locator('.spin-vehicles-grid');
  await expect(loadingSpinner).toBeVisible();
});
