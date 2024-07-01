import { expect } from '@playwright/test';
import { LOCALES } from '../../../utils/helpers/locales';
import { test } from '../../../utils/fixtures/base-test';
import routes from '../../../utils/helpers/routes';

let jsonLocale;

//Object.values(LOCALES).forEach((language) => {
let language = LOCALES.ENGLISH;
test.describe.skip(`Test of locale for ${language.name} language`, () => {
    test.beforeEach(async ({ app }) => {
        const responsePromise = app.mainPage.page.waitForResponse(
            routes.getLocale(language)
        );

        await app.mainPage.goto({ locale: language });

        const response = await responsePromise;

        console.log('beforeEach response', response.text());

        jsonLocale = await response.text();

        //console.log('jsonLocale1', jsonLocale);
    });

    test('check url', async ({ app, page }) => {
        await expect(page).toHaveURL(language.url);
    });

    test('check elements of main page', async ({ app, page }) => {
        console.log('jsonLocale2', jsonLocale);
        await page.pause();
    });
});
//});
