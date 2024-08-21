import { expect, Page } from '@playwright/test';
import { Locale } from '../../utils/helpers/locales';
import { step } from '../../utils/fixtures/base-test';
import { splitStringByCapitalLetters } from '../../utils/helpers/helpers';
import { BaseComponent } from '../components/BaseComponent';

export type TestInfo = {
    project: any;
    title: any;
};

export type IPage = {
    name?: string;
    url: string;
    page: Page;
    crucialElements: Array<BaseComponent>;

    goto(): Promise<void>;
    checkUrl(): Promise<void>;
    checkElements(testInfo?: TestInfo): Promise<void>;
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
    mobileElements: Array<BaseComponent> = [];

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

    async checkElements(testInfo?: TestInfo): Promise<void> {
        await step(
            `Checking that ${this.name} has expected elements on page:`,
            async () => {
                let checkedElements;

                // if test parametrized
                if (testInfo) {
                    // if current project = mobile
                    if (testInfo.project.name.includes('Mobile')) {
                        // if mobileElements declared in page
                        checkedElements =
                            this.mobileElements.length === 0
                                ? this.crucialElements
                                : this.mobileElements;
                    } else {
                        checkedElements = this.crucialElements;
                    }
                } else {
                    checkedElements = this.crucialElements;
                }

                if (checkedElements.length === 0)
                    throw new Error(`No crucial elements are declared on ${this.name}`);

                for (const element of checkedElements) {
                    await element.checkElementsOfComponentVisible();
                }
            }
        );
    }

    private convertPageNameToString() {
        return splitStringByCapitalLetters(this.constructor.name);
    }
}
