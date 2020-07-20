import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueUpdateComponent } from './issue-update/issue-update.component';
import { DailogComponent } from './dailog/dailog.component';
import { ToasterComponent } from './toaster/toaster.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, UserComponent, HeaderComponent, MenuComponent, FooterComponent, IssueCreateComponent, IssueListComponent, IssueUpdateComponent, DailogComponent, ToasterComponent],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppLayoutModule { }
