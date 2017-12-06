import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path:"place-order",component:PlaceOrderComponent},
    {path:"track-order",component:TrackOrderComponent},
    {path:"cancel-order",component:CancelOrderComponent},
    {path:"",redirectTo:"/login",pathMatch:"full"}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);