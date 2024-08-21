import { ListOfCards } from '../ListOfCards';
import { LastActivityCard } from './LastActivityCard';

const selectors = {
    body: '[class^="styles_lastActivityList"]',
    activityCard: '[class*="userCradWrapper"]'
};

export class LastActivitiesList extends ListOfCards {
    public static body = selectors.body;
    public selectors = selectors;

    public activityCard = new LastActivityCard({
        locator: this.locator.locator(LastActivityCard.body)
    });
}
