import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [LayoutComponent, DashboardComponent, UserComponent, HeaderComponent, MenuComponent, FooterComponent],
  imports: [
    CommonModule,
    AppLayoutRoutingModule
  ]
})
export class AppLayoutModule { }
