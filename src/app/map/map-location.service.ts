import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import {Location} from "./location"
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
 import {GoogleMapsAPIWrapper} from '@agm/core';
declare var google: any;

@Injectable()
export class MapLocationService {

  constructor(private _http:Http,private gmapsApi: GoogleMapsAPIWrapper) { }
  getLocation(orderId) :Observable<Location>{
    return this._http.get("../assets/mockData/mapData.json")
    .map((res:Response)=>res.json());
  }
  //
  getRemainingDistance(org,dest){
    console.log(org,dest)
      var origin=new google.maps.LatLng(org.latitude,org.longitude)
      var destination=new google.maps.LatLng(dest.latitude,dest.longitude);
      var distanceMatrixService=new google.maps.DistanceMatrixService();
      distanceMatrixService.getDistanceMatrix({
        origins:[org],
        destinations: [dest],
        travelMode: 'DRIVING'
      },function(response,status){
        console.log(status)
        if(status=='OK'){
          console.log(response)

        }
      })
    // })
  }
  getAllOrders(userId):Observable<any>{
    return this._http.get("../assets/mockData/orderData.json")
    .map((res:Response)=>res.json())
  }

}
