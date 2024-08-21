import { BaseComponent } from '../BaseComponent';
import { Link } from '../common-components/link/Link';

export type NavigationMenuContent = {
    tabButton: string;
};

const selectors = {
    body: '[class^="styles_header"] [class^="styles_navigation"] >> visible=true',
    tabButton:
        '[class^="styles_header"] [class^="styles_navigation"] >> visible=true a[class^="styles_button"]'
};

export class NavigationMenu extends BaseComponent {
    public static body = selectors.body;
    public selectors = selectors;

    public tabButton = new Link({
        locator: this.locator.locator(selectors.tabButton)
    });
}
