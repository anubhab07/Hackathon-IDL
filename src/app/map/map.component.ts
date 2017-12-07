import { Component, OnInit } from '@angular/core';
import {MapLocationService} from "./map-location.service";
import {Location} from "./location"
import {Coordinates} from "./coordinates"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private _mapService:MapLocationService) { }
  title="AGM";
  location: Location;
  intermediateLocation:Coordinates=new Coordinates();
  source:Coordinates=new Coordinates();
  destination:Coordinates=new Coordinates;
  isScrollWheel=false
  lat: number = 20.295971;
  lng: number = 85.825023;
  org={latitude:0,longitude:0};
  dest={latitude:0,longitude:0};
  inter={latitude:0,longitude:0};
  dotted:boolean=true;

  lat2: number = 20.314481;
  lng2: number = 85.820507;
  zoom: number = 11;
  maxZoom: 16;
  ngOnInit() {
    this._mapService.getLocation().subscribe(res=>{this.location=res[0];
      this.intermediateLocation=this.location.intermediateLocation;
      this.source=this.location.source;
      this.destination=this.location.destination;
      this.org={longitude: this.source.longitude, latitude:this.source.latitude}
      this.inter={longitude: this.intermediateLocation.longitude, latitude: this.intermediateLocation.latitude}
      this.dest={longitude: this.destination.longitude, latitude:this.destination.latitude}
      console.log(this.org,this.dest)
      this._mapService.getRemainingDistance(this.inter,this.dest);
    })
    
  }
  displayStatus(marker){
console.log(marker.status)
  }

}
