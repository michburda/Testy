import { test, expect } from '@playwright/test';

test('Wysyłanie wniosku', async ({ page }) => {
  const testData = {
    login: 'adach',
    password: 'Wiosna25!!',
    komentarz: 'test komentarza',
    godzina: '8'
  };
  console.log('Dane testowe:', testData);

  console.log('Przechodzę na stronę logowania');
  await page.goto('http://10.234.18.8/web/login');

  console.log('Klikam i wypełniam pole "Użytkownik"');
  await page.getByPlaceholder('Użytkownik').click();
  await page.getByPlaceholder('Użytkownik').fill(testData.login);
  console.log('Pole "Użytkownik" zostało uzupełnione');

  console.log('Klikam i wypełniam pole "Hasło"');
  await page.getByPlaceholder('Hasło').click();
  await page.getByPlaceholder('Hasło').fill(testData.password);
  console.log('Pole "Hasło" zostało uzupełnione');

  console.log('Klikam przycisk "Zaloguj się"');
  await page.getByRole('button', { name: ' Zaloguj się' }).click();
  console.log('Przycisk "Zaloguj się" został kliknięty');

  console.log('Klikam w link "Wnioski"');
  await page.getByRole('link', { name: ' Wnioski' }).click();
  console.log('Link "Wnioski" został kliknięty');

  console.log('Klikam w "Brak karty"');
  await page.getByTitle('Brak karty').locator('span').click();
  console.log('"Brak karty" został kliknięty');

  console.log('Zaznaczam checkbox "check_wejscie"');
  await page.locator('#check_wejscie').check();
  console.log('Checkbox "check_wejscie" został zaznaczony');

  console.log('Klikam i uzupełniam pierwsze pole placeholder "00"');
  const firstHourField = page.getByPlaceholder('00').first();
  await firstHourField.click();
  await firstHourField.fill(testData.godzina);
  console.log('Pole godziny zostało uzupełnione');

  console.log('Klikam i uzupełniam pole komentarza');
  await page.getByPlaceholder('Wpisz komentarz').click();
  await page.getByPlaceholder('Wpisz komentarz').fill(testData.komentarz);
  console.log('Komentarz został wpisany');

  console.log('Klikam przycisk "Wyślij wniosek"');
  await page.getByRole('button', { name: 'Wyślij wniosek' }).click();
  console.log('Przycisk "Wyślij wniosek" został kliknięty');

  console.log('Sprawdzam, czy pojawiło się potwierdzenie wysłania wniosku');
  await expect(page.getByText('Wniosek wysłany pomyślnie')).toBeVisible({ timeout: 10000 });
  console.log('Potwierdzenie widoczne – test zakończony sukcesem');
});
