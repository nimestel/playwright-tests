import { BaseComponent } from '../BaseComponent';
import { Title } from '../common-components/title/Title';
import { Text } from '../common-components/text/Text';

export type MainPageBannerContent = {
    title: string;
    subtitle: string;
    description: string;
};

const MainPageBannerSelectors = {
    body: '[class^="styles_banner"] ',
    title: '[class^="styles_banner"] [class^="styles_titles"] span',
    subtitle: '[class^="styles_banner"] [class^="styles_titles"] h1',
    description: '[class^="styles_banner"] h2'
};

export class MainPageBanner extends BaseComponent {
    public static body = MainPageBannerSelectors.body;

    public title = new Title({
        locator: this.locator.locator(MainPageBannerSelectors.title)
    });
    public subtitle = new Title({
        locator: this.locator.locator(MainPageBannerSelectors.subtitle)
    });
    public description = new Text({
        locator: this.locator.locator(MainPageBannerSelectors.description)
    });
}
