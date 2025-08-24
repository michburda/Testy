import { test, expect } from '@playwright/test';

test('Wniosek: O zaświadczenie o zatrudnieniu – widoczność przycisku Wyślij', async ({ page }) => {
  // === Dane testowe ===
  const testData = {
    url: 'http://10.234.18.8/web/login',
    login: 'adach',
    password: 'Wiosna25!!',
    wniosekTitle: 'O zaświadczenie o zatrudnieniu',
  };
  console.log('Dane testowe:', testData);


  console.log('Przejście na stronę logowania');
  await page.goto(testData.url);

  console.log('Uzupełnienie loginu');
  await expect(page.getByPlaceholder('Użytkownik')).toBeVisible();
  await page.getByPlaceholder('Użytkownik').fill(testData.login);

  console.log('Uzupełnienie hasła');
  await expect(page.getByPlaceholder('Hasło')).toBeVisible();
  await page.getByPlaceholder('Hasło').fill(testData.password);

  console.log('Kliknięcie Zaloguj się');
  const loginBtn = page.getByRole('button', { name: /Zaloguj się/i });
  await expect(loginBtn).toBeEnabled();
  await loginBtn.click();


  console.log('Przejście do sekcji Wnioski');
  const wnioskiLink = page.getByRole('link', { name: /Wnioski/i });
  await expect(wnioskiLink).toBeVisible();
  await wnioskiLink.click();

  console.log(`Otwieranie wniosku: ${testData.wniosekTitle}`);
  const tile = page.getByTitle(testData.wniosekTitle).locator('span');
  await expect(tile).toBeVisible({ timeout: 10000 });
  await tile.click();

  console.log('Sprawdzenie widoczności przycisku "Wyślij wniosek"');
  await expect(page.getByRole('button', { name: /Wyślij wniosek/i }))
    .toBeVisible({ timeout: 10000 });

  console.log('✅ Test zakończony: przycisk "Wyślij wniosek" jest widoczny');
});
