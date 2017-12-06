import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {Http,Response, HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapLocationService } from './map/map-location.service'
import { AgmCoreModule } from '@agm/core';
import { MapDirectionDirective } from './map/map-direction.directive';

import { PlaceOrderComponent } from './place-order/place-order.component';
import {RouterModule} from '@angular/router';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { routing } from './app.route';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FetchUserService } from './login/fetch-user.service'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDirectionDirective,
    PlaceOrderComponent,
    TrackOrderComponent,
    CancelOrderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsRrsHCNv1yTfK1slvO9UGKTQUv-YY-6M'
    }),
    HttpModule,ReactiveFormsModule,FormsModule,routing
    
    // RouterModule.forRoot([
    //   {path:"place-order",component:PlaceOrderComponent},
    //   {path:"track-order",component:TrackOrderComponent},
    //   {path:"cancel-order",component:CancelOrderComponent},
    //   {path:"",redirectTo:"/place-order",pathMatch:"full"}
    // ])
  ],
  providers: [MapLocationService,FetchUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
