import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { environment } from '../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './states/user.state';
import { IssueState } from './states/issue.state';
import {NgxSpinnersModule} from 'ngx-spinners';
import { HeadermainComponent } from './headermain/headermain.component';
import { FootermainComponent } from './footermain/footermain.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { TextOnlyDirective } from './directives/text-only.directive';
import {MatBadgeModule} from '@angular/material/badge';

declare var $:any;
@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeadermainComponent,
    FootermainComponent,
    NumbersOnlyDirective,
    TextOnlyDirective
  ],
  imports: [
   
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([UserState,IssueState], {
      developmentMode: !environment.production
    }),
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxSpinnersModule,
    MatBadgeModule,
  
   
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
               { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
