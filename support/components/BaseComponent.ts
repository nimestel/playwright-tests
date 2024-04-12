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

    // assertions

    public async shouldBeVisible() {
        await expect(
            this.locator,
            `component "${this.name}" should be visible`
        ).toBeVisible();
    }

    public async anyMemberShouldBeVisible() {
        await expect(
            this.locator.first(),
            `any component "${this.name}" should be visible`
        ).toBeVisible();
    }

    public async shouldHaveText(expectedText: number): Promise<void>;
    public async shouldHaveText(expectedText: string): Promise<void>;
    public async shouldHaveText(expectedTextOrNumber: string | number): Promise<void> {
        await step(
            `Checking that ${this.name} have text: ${expectedTextOrNumber}`,
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

    async checkElementsVisible() {
        await step(
            `Checking that ${this.name} has expected elements displayed:`,
            async () => {
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
