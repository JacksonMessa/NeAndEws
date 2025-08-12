import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoggedAuthGuard } from './services/logged-auth-guard';
import { MynewsComponent } from './pages/mynews/mynews.component';
import { WriterAuthGuard } from './services/writer-auth-guard';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { NewsPublishComponent } from './pages/news-publish/news-publish.component';
import { NewsUpdateComponent } from './pages/news-update/news-update.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
        path:"news",
        redirectTo:"home",
        pathMatch:"full",
    },{
        path:"news",
        children:[
            {
                path:"publish",
                component:NewsPublishComponent,
                canActivate:[WriterAuthGuard]
            },
            {
                path:":id",
                component:NewsDetailsComponent,
                canActivate:[LoggedAuthGuard]
            },
            {
                path:"update/:id",
                component:NewsUpdateComponent,
                canActivate:[WriterAuthGuard]
            }
        ]
        
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
    },
    {
        path:"not-found",
        component: NotFoundComponent
    },
    {
        path:"**",
        redirectTo:"not-found"
    }
];
