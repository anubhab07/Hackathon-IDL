import { Component, OnInit } from '@angular/core';
import {MapLocationService} from "./map-location.service";
import {FetchUserService} from "../login/fetch-user.service"
import {Location} from "./location"
import {Coordinates} from "./coordinates"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  title="Track your order";
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
  destImgUrl="";
  orderIdLst=[];
  selectedOrder="";
  mapLoaded=false;

  zoom: number = 11;
  maxZoom: 16;
  constructor(private _mapService:MapLocationService, private _userService:FetchUserService) {
    //this.getAllOrders();
  }
  ngOnInit() {
    this.getAllOrders();
  }
  getAllOrders(){
    this._mapService.getAllOrders(this._userService.userId).subscribe(orders=>
      {
        this.orderIdLst=orders;
        this.selectedOrder=this.orderIdLst[0]
        this.getMapData(this.selectedOrder)
      })
  }

  getMapData(orderId){
    console.log(orderId)
    this._mapService.getLocation(orderId).subscribe(res=>{this.location=res[0];
      this.intermediateLocation=this.location.intermediateLocation;
      this.source=this.location.source;
      this.destination=this.location.destination;
      this.org={longitude: this.source.longitude, latitude:this.source.latitude}
      this.inter={longitude: this.intermediateLocation.longitude, latitude: this.intermediateLocation.latitude}
      this.dest={longitude: this.destination.longitude, latitude:this.destination.latitude}
      console.log(this.org,this.dest);
      if(this.inter.longitude==this.dest.longitude && this.inter.latitude==this.inter.longitude){
        this.destImgUrl="../../assets/images/destination.png"
      }
      else{
        this.destImgUrl="../../assets/images/destination2.png"
      }
      this.mapLoaded=true
      //this._mapService.getRemainingDistance(this.inter,this.dest);
    })
  }

  displayStatus(marker){
    console.log(marker.status)
  }

  changeOrderId(){
    this.getMapData(this.selectedOrder)
  }

}
