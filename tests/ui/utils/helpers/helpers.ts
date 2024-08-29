import { expect, Page } from '@playwright/test';
import { step } from '../fixtures/base-test';

export async function scrollPageDownAndUp(page) {
    for (let i = 0; i < 10; i++) {
        await acceptCookiesIfExist(page);

        console.log('Scroll page down');
        await page.keyboard.press('PageDown', { delay: 250 });
        await page.waitForTimeout(400);
    }
    for (let i = 0; i < 10; i++) {
        console.log('Scroll page up');
        await page.keyboard.press('PageUp', { delay: 100 });
    }
    await page.waitForLoadState('domcontentloaded');

    try {
        await waitForNoSkeletons(page);
    } catch (e) {
        for (let i = 0; i < 5; i++) await page.keyboard.press('PageDown', { delay: 250 });
        await page.waitForTimeout(300);
        await waitForNoSkeletons(page);
    }
}

export async function scrollPageDown(page) {
    await acceptCookiesIfExist(page);

    console.log('Scroll page down');
    await page.keyboard.press('PageDown', { delay: 250 });

    await page.waitForTimeout(1_000);
}

export function arrayToContain(stack, subStack) {
    expect(
        subStack.every((param) => stack.includes(param)),
        `No expected element in ${stack}`
    ).toBeTruthy();
}

export async function clickIfExists(selector: string) {
    const el = await this.page.$(selector);
    if (el) {
        try {
            await this.page.locator(selector).click({ timeout: 1000 });
        } catch (e) {
            console.log(
                `element with selector '${selector}' already dont exist on this page`
            );
        }
    }
}

export const normalizeSpaces = (text: string) => {
    return text
        .trim()
        .replace(/\u00a0/g, ' ')
        .replace(/\s\s+/g, ' ');
};

export const normalizeText = (inputString: string) =>
    inputString.replace(/\s/g, '').toLowerCase();

export function splitStringByCapitalLetters(stringWithCapitalLetters: string) {
    return stringWithCapitalLetters.split(/(?=[A-Z])/).join(' ');
}

export async function noClientSideErrorDisplayed(page: Page) {
    const clientErrorMessage = 'Application error: a client-side exception has occurred';

    // wait for a possible client-side rendering error
    await page.waitForTimeout(3000);

    await expect(page.getByText(clientErrorMessage)).not.toBeVisible();
}

export async function waitForNoSkeletons(page: Page, timeout = 80_000) {
    console.log('Checking that no loading skeletons on page');

    const skeleton = page.getByText('loading');

    await step(
        `Page shouldn't have loading skeletons - timeout: ${timeout}`,
        async () => {
            await expect
                .poll(
                    async () => {
                        const skeletonCount = await skeleton.count();
                        const areSkeletonsDisplayed =
                            skeletonCount > 0 && (await skeleton.first().isVisible());

                        if (!areSkeletonsDisplayed)
                            console.log('No skeletons anymore...');
                        else console.log('Still skeletons...');
                        return !areSkeletonsDisplayed;
                    },
                    {
                        message: `Page should have no loading skeletons - timeout: ${timeout}`,
                        intervals: [1000],
                        timeout: timeout
                    }
                )
                .toBeTruthy();
        }
    );
}

// scroll page down until participants will be displayed
export async function areParticipantsDisplayed(app) {
    console.log('Checking that some participants are displayed on page');
    await expect
        .poll(
            async () => {
                const participants = await app.activitiesPage.activityCard.participants;
                const count = await participants.count();

                const areParticipantsDisplayed =
                    count > 0 && (await participants.first().isVisible());

                if (areParticipantsDisplayed) {
                    console.log('Participants are displayed');
                } else {
                    try {
                        console.log('Still no participants');

                        await scrollPageDown(app.activitiesPage.page);
                    } catch (e) {
                        console.log('Participants are displayed?');

                        await app.activitiesPage.activityCard.participants.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.participantsAvatars.anyMemberShouldBeVisible();
                    }
                }
                return areParticipantsDisplayed;
            },
            {
                timeout: 20_000,
                message: `Trying to scroll page to activity with participants`
            }
        )
        .toBeTruthy();
}

export async function acceptCookiesIfExist(page: Page) {
    console.log('Checking that no cookies modal on page');
    await expect
        .poll(
            async () => {
                const button = await page.getByText('Allow cookies');
                const count = await button.count();

                const areCookiesDisplayed =
                    count > 0 && (await button.first().isVisible());

                if (!areCookiesDisplayed) {
                    console.log('Cookies not displayed');
                } else {
                    try {
                        console.log('Still cookies...');
                        await button.click({ timeout: 2000 });
                    } catch (e) {
                        console.log('Cookies disappeared?');
                    }
                }
                return !areCookiesDisplayed;
            },
            {
                message: `Trying to accept cookies`
            }
        )
        .toBeTruthy();
}

export async function acceptCookies(page: Page) {
    console.log('Waiting for cookies modal on page and accept it');

    const cookiesSelector = 'text=Allow cookies';

    try {
        await page.waitForSelector(cookiesSelector, { timeout: 5_000 });
    } catch (e) {
        console.log('No cookies found');
    }

    await acceptCookiesIfExist(page);
}
