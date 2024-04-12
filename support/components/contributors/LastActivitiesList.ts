import { ListOfCards } from '../ListOfCards';
import { LastActivityCard } from './LastActivityCard';

const LastActivitiesListSelectors = {
    body: '[class^="styles_lastActivityList"]',
    activityCard: '[class^="styles_lastActivityList"] [class*="userCradWrapper"]'
};

export class LastActivitiesList extends ListOfCards {
    public static body = LastActivitiesListSelectors.body;

    public activityCard = new LastActivityCard({
        locator: this.locator.locator(LastActivitiesListSelectors.activityCard)
    });
}
