import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ActivityCard } from '../../components/activities/card/ActivityCard';
import { ActivityGroupBanner } from '../../components/activities/group/ActivityGroupBanner';
import { ActivityGroupBar } from '../../components/activities/group/ActivityGroupBar';
import { HeaderBlock } from '../../components/header/HeaderBlock';

export class ActivitiesPage extends BasePage {
    public header = new HeaderBlock({
        locator: this.page.locator(HeaderBlock.body)
    });
    public activityGroupBar = new ActivityGroupBar({
        locator: this.page.locator(ActivityGroupBar.body)
    });
    public activityGroupBanner = new ActivityGroupBanner({
        locator: this.page.locator(ActivityGroupBanner.body)
    });
    public activityCard = new ActivityCard({
        locator: this.page.locator(ActivityCard.body)
    });

    crucialElements = [
        this.header,
        this.activityGroupBar,
        this.activityGroupBanner,
        this.activityCard
    ];

    constructor(page: Page) {
        super({ page: page, url: '/activities/events' });
    }
}
