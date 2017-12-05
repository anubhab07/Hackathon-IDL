import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http,Response, HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapLocationService } from './map/map-location.service'
import { AgmCoreModule } from '@agm/core';
import { MapDirectionDirective } from './map/map-direction.directive';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDirectionDirective
  ],
  imports: [
    BrowserModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsRrsHCNv1yTfK1slvO9UGKTQUv-YY-6M'
    }),HttpModule
  ],
  providers: [MapLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
