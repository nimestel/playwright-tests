//
// export interface ViewConfig {
//     main: string;
//     [key: string]: string;
// }
//
// export interface View {
//     tableViewConfig: ViewConfig;
// }
//
// export default class BaseView implements View {
//     tableViewConfig: ViewConfig;
//
//     constructor(tableViewConfig: ViewConfig) {
//         this.tableViewConfig = tableViewConfig;
//     }
//
//     checkData(fixture: Fixture): this {
//         cy.get(this.tableViewConfig.main).within(() => {
//             Object.keys(fixture).forEach((field) => {
//                 let selector = this.tableViewConfig[field];
//                 cy.get(selector)
//                     .should('be.visible')
//                     .and('contain', fixture[field] != null ? String(fixture[field]) : '');
//             });
//         });
//         return this;
//     }
//
//     seeViewFields(): this {
//         seeElements(this.tableViewConfig);
//         return this;
//     }
// }
