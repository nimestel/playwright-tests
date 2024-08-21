import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { HeaderBlock } from '../../components/header/HeaderBlock';
import { MainPageBanner } from '../../components/main-page/MainPageBanner';

export class AboutPage extends BasePage {
    public header = new HeaderBlock({
        locator: this.page.locator(HeaderBlock.body)
    });
    public banner = new MainPageBanner({
        locator: this.page.locator(MainPageBanner.body)
    });

    crucialElements = [this.header, this.banner];

    constructor(page: Page) {
        super({ page: page, url: '/about', name: 'AboutPage' });
    }
}
