import { Component, OnInit,DoCheck,OnDestroy  } from '@angular/core';
import {MapLocationService} from "./map-location.service";
import {FetchUserService} from "../login/fetch-user.service"
import {Location} from "./location"
import {Coordinates} from "./coordinates"
// import { clearInterval } from 'timers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,DoCheck {

  title="Track your Order";
  location: Location;
  intermediateLocation:Coordinates=new Coordinates();
  source:Coordinates=new Coordinates();
  destination:Coordinates=new Coordinates;
  isScrollWheel=false
  org={latitude:0,longitude:0};
  dest={latitude:0,longitude:0};
  inter={latitude:0,longitude:0};
  dotted:boolean=true;
  destImgUrl="";
  sourceImgUrl="";
  intermediateLocationImgUrl="";
  orderIdLst=[];
  selectedOrder="";
  mapLoaded=false;
  remainingDistance=""
  remainingTime="";
  timeRemaining=0;
  state=0;
  timer;

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
    this._mapService.getLocationData(orderId).subscribe(res=>{this.location=res;
      this.intermediateLocation=this.location.intermediateLocation;
      this.state=this.location.state;
      this.source=this.location.source;
      this.destination=this.location.destination;
      this.org={longitude: this.source.longitude, latitude:this.source.latitude}
      this.inter={longitude: this.intermediateLocation.longitude, latitude: this.intermediateLocation.latitude}
      this.dest={longitude: this.destination.longitude, latitude:this.destination.latitude}
      console.log(this.org,this.dest);
      if(this.inter.longitude==this.dest.longitude && this.inter.latitude==this.inter.longitude){
        this.destImgUrl="../../assets/images/delivered.png"
      }
      else{
        this.destImgUrl="../../assets/images/userLocation.png"
      }
      this.sourceImgUrl="../../assets/images/source.png";

      if(this.location.deliveryMode.toLowerCase()=="bike"||this.location.deliveryMode.toLowerCase()=="mopet"){
        this.intermediateLocationImgUrl='../../assets/images/deliveryTruck.png';
      }
      else if(this.location.deliveryMode.toLowerCase()=="drone"){
        this.destImgUrl="../../assets/images/drone.png";        
      }
      this.mapLoaded=true
      this.remainingDistance=this._mapService.remainingDistance;
      this.remainingTime=this._mapService.remainingTime;
      this.timeRemaining=5-this.state;
      this.timer=setTimeout(()=>{
        this.getMapData(this.selectedOrder)
      }, 3000);
      //this._mapService.getRemainingDistance(this.inter,this.dest);
    })
  }
  // setTimeout(()=>{
  //   this.messageSuccess = false;
  // },3000)
  


  ngDoCheck(){
    this.remainingDistance=this._mapService.remainingDistance;
    this.remainingTime=this._mapService.remainingTime
  }
  displayStatus(marker){
    console.log(marker.status)
  }

  changeOrderId(){
    this.getMapData(this.selectedOrder)
  }
  ngDestroy(){
    clearInterval(this.timer)
  }
  

}
