import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/shared.module';
import { CompareFormComponent } from './compare-form/compare-form.component';
import { CompareResultComponent } from './compare-result/compare-result.component';
import { compareRoute, comparePopupRoute} from './compare.route'

const ADDED_COMPONENT = [ 
    CompareFormComponent,
    CompareResultComponent,

];
const MY_ROUTE = [
    ...compareRoute, 
    ...comparePopupRoute
];


@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(MY_ROUTE)],
    declarations: [...ADDED_COMPONENT],
    entryComponents: [...ADDED_COMPONENT],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompareModule {
    constructor() {
    }
}
