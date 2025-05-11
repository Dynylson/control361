import { test, expect, type Page } from '@playwright/test';

const mockVehicles = [
  {
    id: '1',
    plate: 'ABC1234',
    model: 'Volvo FH 540',
    fleet: 'Frota 1',
    location: {
      lat: -23.3231208,
      lng: -46.7537495,
      ignition: 'Ligado',
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: '2',
    plate: 'XYZ9876',
    model: 'Scania R500',
    fleet: 'Frota 2',
    location: {
      lat: -23.5515,
      lng: -46.6343,
      ignition: 'Desligado',
      updatedAt: new Date(Date.now() - 3600000).toISOString()
    }
  }
];

const setupMocks = async (page: Page) => {
  await page.route('**/api/vehicles', route => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockVehicles)
    });
  });
};

test.describe('FleetMap Component', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.goto(process.env.VITE_BASE_URL || 'http://localhost:5173');
  });

  test('should render the map with correct title', async ({ page }) => {
    await expect(page.locator('h2.map-title')).toHaveText('Mapa rastreador');
  });

  test('should display loading spinner when data is loading', async ({ page }) => {
    await page.route('**/api/vehicles', route => route.continue());
    
    await page.goto(process.env.VITE_BASE_URL || 'http://localhost:5173');
    await expect(page.locator('.animate-spin-fleetmap')).toBeVisible();
  });

  test('should render map container with correct styles', async ({ page }) => {
    const mapContainer = page.locator('.map-container');
    await expect(mapContainer).toBeVisible();
    
    const styles = await mapContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        height: computed.height,
        borderRadius: computed.borderRadius,
        border: computed.border
      };
    });
    
    expect(styles.height).toBe('480px');
    expect(styles.borderRadius).toBe('8px');
    expect(styles.border).toContain('rgb(0, 45, 68)');
  });

  test('should have correct link to Google Maps in popup', async ({ page }) => {
    await page.waitForSelector('.leaflet-marker-icon');
    await page.locator('.leaflet-marker-icon').first().click();
    
    const googleMapsLink = page.locator('.coordinates-maps');
    await expect(googleMapsLink).toHaveAttribute(
      'href', 
      `https://www.google.com/maps?q=${mockVehicles[0].location.lat},${mockVehicles[0].location.lng}`
    );
  });
});
