
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const ALL_MODULE = [
    FontAwesomeModule,

];
@NgModule({
    imports: [...ALL_MODULE],
    declarations: [],
    exports: [...ALL_MODULE],
})
export class ExternalSharedModule {

}
