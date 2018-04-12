import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Childern components
import { HomeComponent } from './dashboard/home/home.component';
import { ContactComponent } from './dashboard/contact/contact.component';

import { AuthGuardService } from '../app/servies/authGuard/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full'
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'contact', component: ContactComponent }
        ]
    }, {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [],
})

export class AppRoutingModule {

}