import { BaseComponent } from '../../BaseComponent';
import { Button } from '../../common-components/button/Button';
import { step } from '../../../../utils/fixtures/base-test';
import { expect } from '@playwright/test';

export type ActivityGroupBarContent = {
    button: string;
};

const ActivityGroupBarSelectors = {
    body: '[class*=styles_tabs]',
    button: '[class*=styles_tabs] a[class*=styles_button]'
};

export class ActivityGroupBar extends BaseComponent {
    public static body = ActivityGroupBarSelectors.body;
    public selectors = ActivityGroupBarSelectors;

    public button = new Button({
        locator: this.locator.locator(ActivityGroupBarSelectors.button)
    });

    public async clickGroup(tabName: string) {
        await step(`Click ${tabName} tab`, async () => {
            await this.locator.locator(`//a[.="${tabName}"]`).click();
        });
    }

    public async tabIsActive(tabName: string) {
        await step(`Checking that ${tabName} tab is active`, async () => {
            await expect(
                this.locator.locator(
                    `//a[.="${tabName}"][contains(@class, "styles_active")]`
                )
            ).toBeVisible();
        });
    }
}
