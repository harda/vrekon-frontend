import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'setup-service',
                loadChildren: '../institute/institute.module#InstituteModule'
            },
            {
                path: 'setup-rekon',
                loadChildren: '../compare/compare.module#CompareModule'
            },
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RouteSharedModule {}
