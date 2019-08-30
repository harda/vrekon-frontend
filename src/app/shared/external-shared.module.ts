
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


const ALL_MODULE = [
    FontAwesomeModule,
    //NgbModule,
    NgbModalModule
    

];
@NgModule({
    imports: [...ALL_MODULE],
    declarations: [],
    exports: [...ALL_MODULE],
})
export class ExternalSharedModule {

}
