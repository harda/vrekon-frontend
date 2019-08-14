import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const ALL_MODULE = [
    CommonModule,
    ReactiveFormsModule
];
@NgModule({
    imports: [...ALL_MODULE],
    declarations: [],
    exports: [...ALL_MODULE]
})
export class AngSharedModule {}
