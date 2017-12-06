import { BrowserModule } from '@angular/platform-browser';
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
import { FormsModule } from '@angular/forms';
import {PlaceOrderService} from './place-order/place-order.service';
import {CancelOrderService} from './cancel-order/cancel-order.service';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDirectionDirective,
    PlaceOrderComponent,
    TrackOrderComponent,
    CancelOrderComponent
  ],
  imports: [
    BrowserModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsRrsHCNv1yTfK1slvO9UGKTQUv-YY-6M'
    }),
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path:"place-order",component:PlaceOrderComponent},
      {path:"track-order",component:TrackOrderComponent},
      {path:"cancel-order",component:CancelOrderComponent},
      {path:"",redirectTo:"/place-order",pathMatch:"full"}
    ])
  ],
  providers: [MapLocationService,PlaceOrderService,CancelOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
