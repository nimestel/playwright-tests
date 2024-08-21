import { ListOfCards } from '../ListOfCards';
import { ContributorCard } from './ContributorCard';

const selectors = {
    body: '[class^="styles_contributorsList"]',
    contributorCard: '[class*="userCradWrapper"]'
};

export class ContributorsList extends ListOfCards {
    public selectors = selectors;
    public static body = selectors.body;

    public contributorCard = new ContributorCard({
        locator: this.locator.locator(selectors.contributorCard)
    });
}
