import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'logout',component:LoginComponent},
  {path:'',redirectTo:'/setup-service',pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
