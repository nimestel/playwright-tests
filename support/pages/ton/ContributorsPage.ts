import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ActivityCard } from '../../components/activities/card/ActivityCard';
import { TopContributorsList } from '../../components/contributors/TopContributorsList';
import { LastActivitiesList } from '../../components/contributors/LastActivitiesList';
import { Title } from '../../components/common-components/title/Title';
import { HeaderBlock } from '../../components/header/HeaderBlock';

export class ContributorsPage extends BasePage {
    public header = new HeaderBlock({
        locator: this.page.locator(HeaderBlock.body)
    });

    public topContributorsTitle = new Title({
        locator: this.page.locator('h1[class^="styles_title"]').nth(0)
    });
    public topContributorsList = new TopContributorsList({
        locator: this.page.locator(TopContributorsList.body)
    });
    public lastActivitiesTitle = new ActivityCard({
        locator: this.page.locator('h1[class^="styles_title"]').nth(1)
    });
    public lastActivitiesList = new LastActivitiesList({
        locator: this.page.locator(LastActivitiesList.body)
    });

    crucialElements = [this.header, this.topContributorsList, this.lastActivitiesList];

    constructor(page: Page) {
        super({ page: page, url: '/contributors', name: 'ContributorsPage' });
    }
}
