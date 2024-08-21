import { BaseComponent } from '../../BaseComponent';
import { Title } from '../../common-components/title/Title';
import { Link } from '../../common-components/link/Link';
import { Image } from '../../common-components/image/Image';

export type ActivityGroupContent = {
    badge: string;
    title: string;
    subtitle: string;
    link: string;
    image: string;
};

const ActivityGroupSelectors = {
    body: '[class*=bannerCard]',
    title: '[class*=styles_title]',
    subtitle: '[class*=bannerCard] [class*=styles_regular]',
    link: '[class*=bannerCard] a[class*=styles_button]',
    image: '[class*=bannerCard] img'
};

export class ActivityGroupBanner extends BaseComponent {
    public static body = ActivityGroupSelectors.body;
    public selectors = ActivityGroupSelectors;

    public title = new Title({
        locator: this.locator.locator(ActivityGroupSelectors.title)
    });
    public subtitle = new Title({
        locator: this.locator.locator(ActivityGroupSelectors.subtitle)
    });
    public link = new Link({
        locator: this.locator.locator(ActivityGroupSelectors.link)
    });
    public image = new Image({
        locator: this.locator.locator(ActivityGroupSelectors.image)
    });
}
