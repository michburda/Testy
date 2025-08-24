import { test, expect } from '@playwright/test';

test('Wniosek: Zaświadczenie ', async ({ page }) => {

  const testData = {
    url: 'http://10.234.18.8/web/login',
    login: 'adach',
    password: 'Wiosna25!!',
    wniosekTitlePattern: /Wniosek o zaświadczenie o/i, // dopasowanie bardziej odporne
    adresWysylki: 'zamieszkania',
    komentarz: 'pilne',
    oczekiwanyKomunikat: /Wniosek został wysłany/i,
  };
  console.log('Dane testowe:', testData);


  console.log('Przejście na stronę logowania');
  await page.goto(testData.url);

  console.log('Wprowadzenie użytkownika');
  const userInput = page.getByPlaceholder('Użytkownik');
  await expect(userInput).toBeVisible();
  await userInput.fill(testData.login);

  console.log('Wprowadzenie hasła');
  const passInput = page.getByPlaceholder('Hasło');
  await expect(passInput).toBeVisible();
  await passInput.fill(testData.password);

  console.log('Kliknięcie przycisku Zaloguj się');
  const loginBtn = page.getByRole('button', { name: /Zaloguj się/i });
  await expect(loginBtn).toBeEnabled();
  await loginBtn.click();



  console.log('Przejście do sekcji Wnioski');
  const wnioskiLink = page.getByRole('link', { name: /Wnioski/i });
  await expect(wnioskiLink).toBeVisible({ timeout: 10000 });
  await wnioskiLink.click();


  console.log('Kliknięcie w tytuł wniosku');
  const wniosekTile = page.getByTitle(testData.wniosekTitlePattern).locator('span');
  await expect(wniosekTile).toBeVisible({ timeout: 10000 });
  await wniosekTile.click();


  const labelNames = [
    { label: 'Brutto', exact: true },
    { label: 'Netto', exact: true },
    { label: 'Brutto i netto', exact: true },
    { label: 'ostatnich 3 miesięcy', exact: true },
    { label: 'ostatnich 6 miesięcy', exact: true },
    { label: 'ostatnich 12 miesięcy', exact: true },
  ];

  for (const { label, exact } of labelNames) {
    console.log(`Zaznaczenie opcji: ${label}`);
    const control = page.getByLabel(label, { exact });
    await expect(control).toBeVisible({ timeout: 10000 });
    await control.check();
    await expect(control).toBeChecked();
  }

 
  console.log('Wprowadzenie adresu wysyłki zaświadczenia');
  const wysylkaInput = page.getByLabel('Zaświadczenie proszę wysłać');
  await expect(wysylkaInput).toBeVisible();
  await wysylkaInput.fill(testData.adresWysylki);

  console.log('Wprowadzenie komentarza');
  const komentarzInput = page.getByPlaceholder('Wpisz komentarz');
  await expect(komentarzInput).toBeVisible();
  await komentarzInput.fill(testData.komentarz);

  console.log('Kliknięcie przycisku Wyślij wniosek');
  const sendBtn = page.getByRole('button', { name: /Wyślij wniosek/i });
  await expect(sendBtn).toBeEnabled();
  await sendBtn.click();

  console.log('Potwierdzenie, że wniosek został wysłany (oczekiwany rezultat)');
  await expect(page.getByText(testData.oczekiwanyKomunikat))
    .toBeVisible({ timeout: 10000 });

  console.log('✅ Test zakończony pomyślnie');
});
