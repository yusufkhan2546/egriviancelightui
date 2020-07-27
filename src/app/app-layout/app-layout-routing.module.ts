import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueUpdateComponent } from './issue-update/issue-update.component';
import { AuthGuard } from '../actions/gaurds/auth.gaurd';
import { Role } from '../helpers/role.enum';


const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', component:UserComponent},
    {path:'profile', component:UserComponent},
    {path:'dashboard', component:DashboardComponent ,canActivate:[AuthGuard],data: { roles: [Role.Admin] }},
    {
      path:'raiseissue',component:IssueCreateComponent
    },
    {
      path:'issuelist',component:IssueListComponent
    },
    {
      path:'updateissue',component:IssueUpdateComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
