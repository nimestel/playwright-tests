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

const selectors = {
    body: '[class^="styles_contributorsList"] [class*="userCradWrapper"]',
    avatar: 'img[class*="styles_avatar"]',
    fullname: '[class*="styles_headline"]',
    badge: '[class*="styles_nameWrapper"] button[class*="styles_triggerButton"]',
    bio: '[class*="styles_regular"]',
    awards: '[class*="styles_awards"] '
};

export class ContributorCard extends BaseComponent {
    public static body = selectors.body;
    public selectors = selectors;

    public number = new Button({
        locator: this.locator.getByRole('button')
    });

    public avatar = new Image({
        locator: this.locator.locator(selectors.avatar)
    });

    public fullname = new Title({
        locator: this.locator.locator(selectors.fullname)
    });

    public badge = new Button({
        locator: this.locator.locator(selectors.badge)
    });

    public bio = new Title({
        locator: this.locator.locator(selectors.bio)
    });

    public awards = new Button({
        locator: this.locator.locator(selectors.awards)
    });
}
