import { BaseComponent } from '../BaseComponent';
import { Link } from '../common-components/link/Link';
import { Button } from '../common-components/button/Button';
import { NavigationMenu } from './NavigationMenu';

export type HeaderContent = {
    logo: string;
    navigationMenu: string;
    auth: string;
};

const HeaderSelectors = {
    body: 'header[class^="styles_header"]',
    logo: `[class^="styles_header"] [class^="styles_navigation"] a[class^="styles_logo"]`,
    navigationMenu:
        '[class^="styles_header"] [class^="styles_navigation"] >> visible=true',
    auth: '[class^="styles_header"] [class^="styles_headerAuth"]'
};

export class HeaderBlock extends BaseComponent {
    public static body = HeaderSelectors.body;

    public logo = new Link({
        locator: this.locator.locator(HeaderSelectors.logo)
    });
    public navigationMenu = new NavigationMenu({
        locator: this.locator.locator(HeaderSelectors.navigationMenu)
    });
    public auth = new Button({
        locator: this.locator.locator(HeaderSelectors.auth)
    });
}
