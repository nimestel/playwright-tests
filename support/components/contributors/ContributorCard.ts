import { Button } from '../common-components/button/Button';
import { Image } from '../common-components/image/Image';
import { Title } from '../common-components/title/Title';
import { BaseComponent } from '../BaseComponent';

export type ContributorCardContent = {
    avatar: string;
    number: string;
    fullname: string;
    badge: string;
    bio: string;
    awards: string;
};

const ContributorCardSelectors = {
    body: '[class^="styles_contributorsList"] [class*="userCradWrapper"]',
    avatar: '[class^="styles_contributorsList"] [class*="userCradWrapper"] img[class*="styles_avatar"]',
    fullname:
        '[class^="styles_contributorsList"] [class*="userCradWrapper"] [class*="styles_headline"]',
    badge: '[class^="styles_contributorsList"] [class*="styles_nameWrapper"] button[class*="styles_triggerButton"]',
    bio: '[class^="styles_contributorsList"] [class*="styles_regular"]',
    awards: '[class^="styles_contributorsList"] [class*="styles_awards"] '
};

export class ContributorCard extends BaseComponent {
    public static body = ContributorCardSelectors.body;

    public number = new Button({
        locator: this.locator.locator(ContributorCardSelectors.body).getByRole('button')
    });

    public avatar = new Image({
        locator: this.locator.locator(ContributorCardSelectors.avatar)
    });

    public fullname = new Title({
        locator: this.locator.locator(ContributorCardSelectors.fullname)
    });

    public badge = new Button({
        locator: this.locator.locator(ContributorCardSelectors.badge)
    });

    public bio = new Title({
        locator: this.locator.locator(ContributorCardSelectors.bio)
    });

    public awards = new Button({
        locator: this.locator.locator(ContributorCardSelectors.awards)
    });
}
