import { BaseComponent } from './BaseComponent';
import { step } from '../../utils/fixtures/base-test';
import { expect } from '@playwright/test';
import { Button } from './common-components/button/Button';

const selectors = {
    tab: '[class*=styles_button]'
};

export class Tabs extends BaseComponent {
    public selectors = selectors;

    public tab = new Button({
        locator: this.locator.locator(selectors.tab)
    });

    protected tabSelector(tabName: string) {
        return `//*[.="${tabName}"][contains(@class, "styles_button")]`;
    }

    public async clickTab(tabName: string) {
        await step(`Click ${tabName} tab`, async () => {
            await this.locator.locator(this.tabSelector(tabName)).first().click();
        });
    }

    public async tabIsActive(tabName: string) {
        await step(`Checking that ${tabName} tab is active`, async () => {
            await expect(
                this.locator
                    .locator(`//*[.="${tabName}"][contains(@class, "styles_active")]`)
                    .first()
            ).toBeVisible();
        });
    }
}
