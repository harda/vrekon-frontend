import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    SpinnerComponent
} from './spinner.component';
const ADDED_COMPONENT = [ 
    SpinnerComponent
];


@NgModule({

    imports: [
        OverlayModule
    ],
    declarations: [...ADDED_COMPONENT],
    entryComponents: [...ADDED_COMPONENT],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class SpinnerModule {
    constructor() {
    }
}
