import { Button } from '../../common-components/button/Button';
import { Tabs } from '../../Tabs';

export type ActivityGroupBarContent = {
    button: string;
};

const ActivityGroupBarSelectors = {
    body: '[class*=styles_tabsWrapper]',
    button: 'a[class*=styles_button]'
};

const selectors = {
    body: '[class*=styles_tabs]',
    tab: 'a[class*=styles_button]'
};

export class ActivityGroupBar extends Tabs {
    public static body = selectors.body;
    public selectors = selectors;

    public tab = new Button({
        locator: this.locator.locator(selectors.tab)
    });
}
