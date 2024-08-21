import { BaseComponent } from '../BaseComponent';
import { Link } from '../common-components/link/Link';
import { Button } from '../common-components/button/Button';
import { NavigationMenu } from './NavigationMenu';

export type HeaderContent = {
    logo: string;
    navigationMenu: string;
    auth: string;
};

const selectors = {
    body: 'header[class^="styles_header"]',
    logo: `[class^="styles_navigation"] a[class^="styles_logo"]`,
    navigationMenu: '[class^="styles_navigation"] >> visible=true',
    auth: '[class^="styles_headerAuth"]'
};

export class HeaderBlock extends BaseComponent {
    public static body = selectors.body;
    public selectors = selectors;

    public logo = new Link({
        locator: this.locator.locator(selectors.logo)
    });
    public navigationMenu = new NavigationMenu({
        locator: this.locator.locator(selectors.navigationMenu)
    });
    public auth = new Button({
        locator: this.locator.locator(selectors.auth)
    });
}
