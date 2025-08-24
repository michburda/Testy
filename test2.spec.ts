import { test, expect } from '@playwright/test';

test('Wniosek o wydanie dokumentu - wysłanie formularza', async ({ page }) => {
  
  const testData = {
    login: 'adach',
    password: 'Wiosna25!!',
    dodatkowe: 'brak dodatkowego celu',
    cel: 'księgowość',
    wysylka: 'pilne',
    komentarz: 'komentarz testowy'
  };
  console.log('Dane testowe:', testData);


  console.log('Przejście na stronę logowania');
  await page.goto('http://10.234.18.8/web/login');

  console.log('Wypełnienie pola Użytkownik');
  await page.getByPlaceholder('Użytkownik').fill(testData.login);

  console.log('Wypełnienie pola Hasło');
  await page.getByPlaceholder('Hasło').fill(testData.password);

  console.log('Kliknięcie w przycisk Zaloguj się');
  await page.getByRole('button', { name: ' Zaloguj się' }).click();

  console.log('Przejście do sekcji Wnioski');
  await page.getByRole('link', { name: ' Wnioski' }).click();

  console.log('Kliknięcie w tytuł wniosku o wydanie dokumentu');
  await page.getByTitle('Wniosek o wydanie dokumentu').locator('span').click();

  console.log('Zaznaczenie checkboxów');
  for (let i = 1; i <= 10; i++) {
    await page.locator(`#check_${i}`).check();
    console.log(`Checkbox ${i} zaznaczony`);
  }

  console.log('Wypełnienie pola Dodatkowe dane dotyczące');
  await page.getByLabel('Dodatkowe dane dotyczące').fill(testData.dodatkowe);

  console.log('Wypełnienie pola Cel ubiegania się o wydanie');
  await page.getByLabel('Cel ubiegania się o wydanie').fill(testData.cel);

  console.log('Wypełnienie pola Zaświadczenie proszę wysłać');
  await page.getByLabel('Zaświadczenie proszę wysłać').fill(testData.wysylka);

  console.log('Wypełnienie pola Wpisz komentarz');
  await page.getByPlaceholder('Wpisz komentarz').fill(testData.komentarz);

  console.log('Kliknięcie w przycisk Wyślij wniosek');
  await page.getByRole('button', { name: 'Wyślij wniosek' }).click();

  console.log('Sprawdzenie widoczności komunikatu o wysłaniu wniosku');
  await expect(page.getByText('Wniosek został wysłany')).toBeVisible({ timeout: 10000 });

  console.log('Test zakończony pomyślnie');
});
