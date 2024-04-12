import { expect, Page } from '@playwright/test';
import { Locale } from '../../utils/helpers/locales';
import { step } from '../../utils/fixtures/base-test';
import { splitStringByCapitalLetters } from '../../utils/helpers/helpers';
import { BaseComponent } from '../components/BaseComponent';

export type IPage = {
    name?: string;
    url: string;
    page: Page;
    crucialElements: Array<BaseComponent>;

    goto(): Promise<void>;
    checkUrl(): Promise<void>;
    checkElements(): Promise<void>;
};

export type PageObjectProps = {
    name?: string;
    url: string;
    page: Page;
};

export abstract class BasePage implements IPage {
    name: string;
    url: string;
    page: Page;
    crucialElements: Array<BaseComponent> = [];

    protected constructor({ name, url, page }: PageObjectProps) {
        this.name = name ? name : this.convertPageNameToString();
        this.url = url;
        this.page = page;
    }

    async goto(options?: { locale: Locale }): Promise<void> {
        await step(`Going to ${this.name} by URL: ${this.url}`, async () => {
            if (options) {
                await this.page.goto(options.locale.url, {
                    waitUntil: 'domcontentloaded'
                });
            } else {
                await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
            }
        });
    }

    async checkUrl() {
        await step(`Checking that ${this.name} has expected url`, async () => {
            await expect(this.page).toHaveURL(this.url);
        });
    }

    async checkElements() {
        await step(
            `Checking that ${this.name} has expected elements on page:`,
            async () => {
                if (this.crucialElements.length === 0)
                    console.log(`No crucial elements are declared on ${this.name}`);

                for (const element of this.crucialElements) {
                    await element.anyMemberShouldBeVisible();
                }
            }
        );
    }

    private convertPageNameToString() {
        return splitStringByCapitalLetters(this.constructor.name);
    }
}
