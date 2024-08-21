import { expect, Locator } from '@playwright/test';
import { step } from '../../utils/fixtures/base-test';
import { splitStringByCapitalLetters } from '../../utils/helpers/helpers';

export type ComponentProps = {
    name?: string;
    locator: Locator;
};

export type Selectors = {
    [key: string]: string;
};

export abstract class BaseComponent {
    protected name: string;
    protected locator: Locator;
    protected selectors: Selectors;

    public constructor({ name, locator }: ComponentProps) {
        this.name = name ? name : this.convertComponentNameToString();
        this.locator = locator;
    }

    // actions

    public async click(...[args]: Parameters<typeof this.locator.click>) {
        await step(
            `Clicking on ${this.name} with ${args?.button ?? 'left'} mouse button`,
            async () => {
                await this.locator.click(args);
            }
        );
    }

    public first() {
        return this.locator.first();
    }

    public count() {
        return this.locator.count();
    }

    // assertions

    public async shouldBeVisible() {
        await expect(
            this.locator,
            `component "${this.name}" (${this.locator}) should be visible`
        ).toBeVisible();
    }

    public async shouldNotBeVisible() {
        await expect(
            this.locator,
            `component "${this.name}" (${this.locator}) should not be visible`
        ).not.toBeVisible();
    }

    public async anyMemberShouldBeVisible() {
        await expect(
            this.locator.first(),
            `any component "${this.name}" (${this.locator}) should be visible`
        ).toBeVisible();
    }

    // public async someElementsOfComponentShouldBeVisible() {
    //     await step(`Checking that ${this.name} is visible`, async () => {
    //         let arrayOfElements = Object.keys(this);
    //         for (let element of arrayOfElements)
    //         {
    //             if(await element.isVisible())
    //                 await expect(this.locator.first()).toBeVisible();
    //         }
    //     });
    // }

    public async shouldHaveCount(expectedCount: number): Promise<void> {
        await step(
            `Checking that "${this.name}" (${this.locator}) have count equal ${expectedCount}`,
            async () => {
                await expect(this.locator).toHaveCount(expectedCount);
            }
        );
    }

    public async shouldHaveText(expectedText: number): Promise<void>;
    public async shouldHaveText(expectedText: string): Promise<void>;
    public async shouldHaveText(expectedTextOrNumber: string | number): Promise<void> {
        await step(
            `Checking that "${this.name}" (${this.locator}) have text: ${expectedTextOrNumber}`,
            async () => {
                let expectedText;
                switch (typeof expectedTextOrNumber) {
                    case 'number':
                        expectedText = expectedTextOrNumber.toString();
                        break;
                    case 'string':
                        expectedText = expectedTextOrNumber;
                        break;
                    default:
                        throw new Error(`Invalid arg: ${expectedTextOrNumber}`);
                }

                await expect(this.locator).toHaveText(expectedText);
            }
        );
    }

    /**
     * if baseComponent has field "selectors" it means there are sub components inside this component
     * this method iterate over each sub component and check is it visible
     */
    async checkElementsOfComponentVisible() {
        await step(
            `Checking that "${this.name}" (${this.locator}) has expected elements displayed:`,
            async () => {
                if (!this.selectors) {
                    console.log(
                        `There are no sub elements in "${this.name}" (${this.locator}), check that element is visible`
                    );
                    await this.anyMemberShouldBeVisible();
                    return;
                }
                for (const [field, selector] of Object.entries(this.selectors)) {
                    if (field != 'body') {
                        await step(`Checking that ${field} is displayed:`, async () => {
                            await expect
                                .soft(
                                    this.locator.locator(selector).first(),
                                    `element "${field}" should be visible`
                                )
                                .toBeVisible();
                        });
                    }
                }
            }
        );
    }

    private convertComponentNameToString() {
        return splitStringByCapitalLetters(this.constructor.name);
    }
}
