import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap';

import { AuthService } from './servies/auth-service/auth.service';
import { DataService } from './servies/data-service/data.service';
import { AuthGuardService } from './servies/authGuard/auth-guard.service';

import { AppRoutingModule } from './app.routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ContactComponent } from './dashboard/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
