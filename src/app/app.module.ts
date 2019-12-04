import './vendor.ts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppSharedModule } from './shared/shared.module';
import { RouteSharedModule } from './shared/route-shared.module';
//module
import { InstituteModule } from './institute/institute.module';
import { CompareModule } from './compare/compare.module';
import { SpinnerModule } from './providers/spinner/spinner.module';
//providers
import { ResultData } from './providers/result-data';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouteSharedModule,
    AppSharedModule.forRoot(),


    //internal module
    InstituteModule,
    CompareModule,

    //other module

    SpinnerModule,
    HttpClientModule,

  ],
  providers: [ResultData],
  bootstrap: [AppComponent]
})
export class AppModule {


}
