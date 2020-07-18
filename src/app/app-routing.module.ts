import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
 {path:'' , component:LoginComponent ,children:[
  
 ]},
 { path:'login',component:LoginComponent },
 { path:'user',  loadChildren:'./app-layout/app-layout.module#AppLayoutModule'},
 { path:'register',component:RegisterComponent },
 { path:'forgot',component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
