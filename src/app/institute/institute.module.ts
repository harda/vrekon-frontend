import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/shared.module';
import {
    InstituteComponent,
    ServiceCreateComponent,
    instituteRoute,
    institutePopupRoute
} from './';
import { UpdateInstituteComponent } from './update-institute.component';

const ADDED_COMPONENT = [ 
    InstituteComponent,
    UpdateInstituteComponent,
    ServiceCreateComponent,

];
const MY_ROUTE = [
    ...instituteRoute, 
    ...institutePopupRoute
];


@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(MY_ROUTE)],
    declarations: [...ADDED_COMPONENT],
    entryComponents: [...ADDED_COMPONENT],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InstituteModule {
    constructor() {
        // this.languageHelper.language.subscribe((languageKey: string) => {
        //     if (languageKey !== undefined) {
        //         this.languageService.changeLanguage(languageKey);
        //     }
        // });
    }
}
