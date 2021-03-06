import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {Http,Response, HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapLocationService } from './map/map-location.service'
import { AgmCoreModule,MapsAPILoader,GoogleMapsAPIWrapper } from '@agm/core';
import { MapDirectionDirective } from './map/map-direction.directive';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { RouterModule } from '@angular/router';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { routing } from './app.route';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FetchUserService } from './login/fetch-user.service'
// import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import {PlaceOrderService} from './place-order/place-order.service';
import {CancelOrderService} from './cancel-order/cancel-order.service';

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
  ],
  providers: [MapLocationService,PlaceOrderService,CancelOrderService,FetchUserService,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
