import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoggedAuthGuard } from './services/logged-auth-guard';
import { MynewsComponent } from './pages/mynews/mynews.component';
import { WriterAuthGuard } from './services/writer-auth-guard';

export const routes: Routes = [
    {
        path:"home",
        component:HomeComponent,
        canActivate:[LoggedAuthGuard]
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"my-news",
        component:MynewsComponent,
        canActivate:[WriterAuthGuard]
    }
];
