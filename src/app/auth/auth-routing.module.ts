import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent
    },
    {
        path: '',
        component: LandingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }