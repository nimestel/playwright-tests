import { Page } from '@playwright/test';
import { MainPage } from '../../support/pages/ton/MainPage';
import { ActivitiesPage } from '../../support/pages/ton/ActivitiesPage';
import { ContributorsPage } from '../../support/pages/ton/ContributorsPage';

export interface BaseTest {
    mainPage: MainPage;
    activitiesPage: ActivitiesPage;
    contributorsPage: ContributorsPage;
}

export class App {
    constructor(public page: Page) {}

    public mainPage = new MainPage(this.page);
    public activitiesPage = new ActivitiesPage(this.page);
    public contributorsPage = new ContributorsPage(this.page);

    /**
     * for debug purpose only
     * don't forget to delete all executions before commit
     */
    public async pause() {
        await this.page.pause();
    }
}
