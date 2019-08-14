import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngSharedModule } from './ang-shared.module'
import { ExternalSharedModule } from './external-shared.module';
import { FaModule } from './fa.module';

@NgModule({
    imports: [ AngSharedModule ],
    declarations: [],
    providers: [],
    entryComponents: [],
    exports: [ 
        AngSharedModule,
        ExternalSharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule {
    static forRoot() {
        return {
            ngModule: AppSharedModule
        };
    }
}
