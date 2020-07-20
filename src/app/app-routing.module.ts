import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './actions/gaurds/auth.gaurd';


const routes: Routes = [
 {path:'' , component:LoginComponent ,children:[
  
 ]},
 { path:'user',  loadChildren:'./app-layout/app-layout.module#AppLayoutModule',canActivate:[AuthGuard]},
 { path:'login',component:LoginComponent },
 { path:'register',component:RegisterComponent },
 { path:'forgot',component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
