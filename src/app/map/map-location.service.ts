import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import {Location} from "./location"
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MapLocationService {

  constructor(private _http:Http) { }
  getLocation() :Observable<Location>{
    return this._http.get("../assets/mockData/mapData.json")
    .map((res:Response)=>res.json());
  }

}
