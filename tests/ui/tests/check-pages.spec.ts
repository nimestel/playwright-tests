import { step, test } from '../utils/fixtures/base-test';
import { IPage } from '../support/pages/BasePage';
import { ContributorsPage } from '../support/pages/ton/ContributorsPage';
import routes from '../utils/helpers/routes';
import { acceptCookiesIfExist, areParticipantsDisplayed } from '../utils/helpers/helpers';
import { AboutPage } from '../support/pages/ton/AboutPage';
import { ActivitiesPage } from '../support/pages/ton/ActivitiesPage';

let thisPage: IPage;
const pages = [ContributorsPage, AboutPage, ActivitiesPage];

test.describe(`Check pages and elements`, () => {
    pages.forEach((currentPage) => {
        test.describe(`Check page ${currentPage.name}`, () => {
            test('check url and elements', async ({ page }, testInfo) => {
                thisPage = new currentPage(page);

                console.log('process env baseURL:', process.env.BASE_URL);

                await thisPage.goto();

                await thisPage.checkUrl();

                await acceptCookiesIfExist(page);

                await thisPage.checkElements(testInfo);
            });
        });
    });

    test('Check activity groups at /activities page', async ({ app, mock, page }) => {
        test.setTimeout(100_000);

        let activityGroups;

        await mock.getResponse(routes.getActivityGroup(), (result: any) => {
            activityGroups = result.pageProps.activityGroups;
        });

        await app.activitiesPage.goto();
        await page.waitForResponse(routes.getActivityGroup());

        await step(`Checking that first tab is Active:`, async () => {
            await app.activitiesPage.activityGroupBar.tabIsActive('Active');
        });

        await app.activitiesPage.activityGroupBar.tab.shouldHaveCount(
            activityGroups.length
        );
        await app.activitiesPage.activityCard.anyMemberShouldBeVisible();

        await mock.purgeAllRoutes();

        for (let group of activityGroups) {
            await step(`Checking "${group.name}" tab:`, async () => {
                await acceptCookiesIfExist(page);
                await app.activitiesPage.activityGroupBar.clickTab(group.name);

                await app.activitiesPage.activityGroupBar.tabIsActive(group.name);

                await step(
                    `Checking that expected activity groups have banner`,
                    async () => {
                        if (group.slug === 'contests' || group.slug === 'open-league') {
                            await app.activitiesPage.activityGroupBanner.shouldBeVisible();
                        }
                    }
                );

                await step(
                    `Checking that ${group.name} group has expected elements displayed`,
                    async () => {
                        if (group.slug != 'active' && group.slug != 'open-league') {
                            await areParticipantsDisplayed(app);
                        }

                        await app.activitiesPage.activityCard.additionalInfo.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.title.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.subtitle.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.image.anyMemberShouldBeVisible();
                    }
                );
            });
        }
    });

    test.skip('debug', async ({ app, page }) => {
        await app.contributorsPage.goto();
        await app.contributorsPage.checkUrl();
        await app.contributorsPage.checkElements();
    });
});
