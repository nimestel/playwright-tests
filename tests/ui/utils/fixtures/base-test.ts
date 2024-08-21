import { test as base } from '@playwright/test';
import { App } from './App';
import { Mock } from './Mock';

type BaseFixture = {
    app: App;
    mock: Mock;
};

export const test = base.extend<BaseFixture>({
    app: async ({ page }, use) => {
        await use(new App(page));
    },

    mock: async ({ page }, use) => {
        await use(new Mock(page));
    },

    page: async ({ page }, use) => {
        await step(`Set cookies to accepted`, async () => {
            await page.addInitScript((params) => {
                window.localStorage.setItem(
                    'cookies-allowance',
                    '{"value":true,"expiry":1711480716897}'
                );
            });

            await use(page);
        });
    }
});

/**
 * shorter version of test.step() for common usage
 *
 * @param stepDescription
 * @param stepFunction
 */
export const step = (stepDescription: string, stepFunction: () => any) => {
    console.log(stepDescription);
    return test.step(stepDescription, stepFunction);
};

export { expect } from '@playwright/test';
