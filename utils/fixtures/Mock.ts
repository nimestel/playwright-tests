import { APIResponse, Page, Request } from '@playwright/test';

export type ModifyResponse = (
    res: APIResponse,
    req: Request
) => Promise<InterceptOptions>;

export interface InterceptOptions {
    body?: string;
    contentType?: string;
    headers?: { [key: string]: string };
    path?: string;
    status?: number;
}

export class Mock {
    readonly page: Page;
    readonly activeRoutes: string[];

    constructor(page: Page) {
        this.page = page;
        this.activeRoutes = [];
    }

    public async route(url: string, body: Record<string, unknown>) {
        await this.page.route(url, async (route, request) => {
            // Can be filtered, for example by method like below:
            //
            // if (request.method() === 'POST') {
            //     await route.continue()
            //     return
            // }
            await route.fulfill({
                json: body,
                status: 200
            });
        });
    }

    async purgeAllRoutes() {
        for (const route of this.activeRoutes) {
            await this.page.unroute(route);
        }
    }

    async blockResponse(routePattern: string) {
        await this.page.route(routePattern, (route) => {
            route.fulfill({
                status: 404,
                contentType: 'text/plain',
                body: 'Error'
            });
        });
    }

    async modifyResponse(routePattern: string, modifyFunction: ModifyResponse) {
        await this.page.route(routePattern, async (route) => {
            // Fetch original response
            const response = await this.page.request.fetch(route.request(), {
                ignoreHTTPSErrors: true
            });
            const modifiedValue = await modifyFunction(response, route.request());

            // Override original response with modifiedValue
            const result = {
                response,
                ...modifiedValue
            };

            await route.fulfill(result);
        });
        this.activeRoutes.push(routePattern);
    }

    async clickAndWait(locator: string, expectResponseURL: string) {
        const [response] = await Promise.all([
            this.page.waitForResponse(expectResponseURL),
            this.page.click(locator)
        ]);
        const json = await response.text();
        const obj = JSON.parse(json);
        const request = await response.request().postDataJSON();
        return { response: response, json: json, obj: obj, request: request };
    }

    async waitAndGetRequestBody(route: string) {
        const request = await this.page.waitForRequest(route);
        return request.postDataJSON();
    }

    async waitForResponse(route: string) {
        await this.page.route(route, async (route2) => {
            const response = await route2.fetch();
            const json = await response.json();

            //console.log('response1 json:', json);

            const request = await this.page.waitForRequest(route);
            const response2 = await request.response();

            // if (response2 != null) {
            //     console.log('response:', await response.text());
            //     console.log('request', await request.postDataJSON());
            // }
            //
            // console.log(111);
        });
    }

    async getResponse(
        routePattern: string,
        getResponseDataCallback: (result: object) => void
    ) {
        await this.page.route(routePattern, async (route) => {
            const request = route.request();
            const response = await route.fetch();

            //console.log('response', response);

            const body = await response.text();
            const status = response.status();

            //console.log('body', body);

            const json = JSON.parse(body);

            getResponseDataCallback(json);

            await route.fulfill({
                status: status,
                body: body
            });
        });
        this.activeRoutes.push(routePattern);
    }
}
