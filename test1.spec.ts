import { test, expect } from '@playwright/test';

test('test zmiany danych pracownika', async ({ page }) => {

    const username = 'E7500190';
    const password = 'Zima2024!!';


    const today = new Date();
    today.setDate(today.getDate() + 3);
    const day = today.getDate();


    await test.step('Przejdź do strony logowania', async () => {
        await page.goto('http://testkaro2/web/login');
        await expect(page).toHaveURL(/login/);
    });

    await test.step('Zaloguj się', async () => {
        await page.getByPlaceholder('Użytkownik').fill(username);
        await page.getByPlaceholder('Hasło').fill(password);
        await page.getByRole('button', { name: ' Zaloguj się' }).click();
       
        await expect(page).not.toHaveURL(/login/);
    });


    await test.step('Przejdź do zakładki Wnioski -> Dane pracownika -> Dane płacowe', async () => {
        await page.getByRole('link', { name: ' Wnioski' }).click();
        await page.getByRole('link', { name: ' Dane pracownika' }).click();
        await page.getByRole('link', { name: ' Dane płacowe' }).click();
    
        await expect(page.locator('#searchBox')).toBeVisible();
    });

 
    await test.step('Wyszukaj PI7n i potwierdź', async () => {
        await page.locator('#searchBox').fill('PI7n');
        await page.getByRole('button', { name: 'OK' }).click();
    });


    await test.step('Wybierz datę zmiany konta', async () => {
        await page.locator('#dataZmianyKonta').click();
        // Wybierz element z datą i kliknij go. Użycie .first() rozwiązuje problem "strict mode"
        await page.getByRole('link', { name: String(day) }).first().click();
    });


    await test.step('Wypełnij formularz i wyślij', async () => {
        await page.getByLabel('Konto podstawowe', { exact: true }).fill('10 1090 1753 0000 0001 5913 2875');
        
        await expect(page.getByLabel('Konto podstawowe', { exact: true })).toHaveValue('10 1090 1753 0000 0001 5913 2875');
        await page.getByLabel('Nazwa banku').click();
        await page.getByRole('button', { name: 'Wyślij' }).click();
     
        await expect(page.getByText('Wniosek został wysłany', { exact: true })).toBeVisible();
    });
});