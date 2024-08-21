import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ContributorsList } from '../../components/contributors/ContributorsList';
import { LastActivitiesList } from '../../components/contributors/LastActivitiesList';
import { Title } from '../../components/common-components/title/Title';
import { HeaderBlock } from '../../components/header/HeaderBlock';
import { ActivityCard } from '../../components/activities/card/ActivityCard';
import { Button } from '../../components/common-components/button/Button';

export class ContributorsPage extends BasePage {
    public header = new HeaderBlock({
        locator: this.page.locator(HeaderBlock.body)
    });

    public topContributorsTitle = new Title({
        locator: this.page.locator('h1[class^="styles_title"]').nth(0)
    });
    public topContributorsList = new ContributorsList({
        locator: this.page.locator(ContributorsList.body)
    });
    public lastActivitiesTitle = new ActivityCard({
        locator: this.page.locator('h1[class^="styles_title"]').nth(1)
    });
    public lastActivitiesList = new LastActivitiesList({
        locator: this.page.locator(LastActivitiesList.body)
    });
    public tab = new Button({
        locator: this.page.locator('[class*="styles_tabsButtons"]')
    });

    crucialElements = [this.header, this.topContributorsList, this.lastActivitiesList];
    mobileElements = [this.header, this.topContributorsList, this.tab];

    constructor(page: Page) {
        super({ page: page, url: '/contributors', name: 'ContributorsPage' });
    }
}
