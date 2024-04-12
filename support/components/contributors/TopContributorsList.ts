import { ListOfCards } from '../ListOfCards';
import { ContributorCard } from './ContributorCard';

const TopContributorsListSelectors = {
    body: '[class^="styles_contributorsList"]',
    contributorCard: '[class^="styles_contributorsList"] [class*="userCradWrapper"]'
};

export class TopContributorsList extends ListOfCards {
    public static body = TopContributorsListSelectors.body;

    public contributorCard = new ContributorCard({
        locator: this.locator.locator(TopContributorsListSelectors.contributorCard)
    });
}
