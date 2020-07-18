import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', component:UserComponent},
    {path:'profile', component:UserComponent},
    {path:'dashboard', component:DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
