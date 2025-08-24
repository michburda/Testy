import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://testkaro2/web/login');

 
  await page.getByPlaceholder('Użytkownik').fill('E7500190');
  await page.getByPlaceholder('Hasło').fill('Zima2024!!');
  await page.getByRole('button', { name: ' Zaloguj się' }).click();

  await page.getByRole('link', { name: ' Wnioski' }).click();

 
  await page.getByTitle('Incydentalna praca w firmie').locator('span').click();

  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterFourDays = new Date(today);
  dayAfterFourDays.setDate(today.getDate() + 5);

  const startDay = tomorrow.getDate().toString();
  const endDay = dayAfterFourDays.getDate().toString();

  await page.locator('#dataRozpoczecia').click();
  const startDateLocator = page.locator('.ui-datepicker-calendar').getByRole('link', { name: startDay, exact: true });
  await expect(startDateLocator.first()).toBeVisible();
  await startDateLocator.first().click();

  await page.locator('#dataZakonczenia').click();
  const endDateLocator = page.locator('.ui-datepicker-calendar').getByRole('link', { name: endDay, exact: true });
  await expect(endDateLocator.first()).toBeVisible();
  await endDateLocator.first().click();

  await expect(page.getByRole('button', { name: 'Wyślij wniosek' })).toBeVisible();

  console.log(' Przyciśk "Wyślij wniosek" jest widoczny');
});
