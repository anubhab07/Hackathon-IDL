import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { User } from "./user"
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class FetchUserService {
  auth:boolean;
  constructor(private _http:Http) { }
  getUsers() :Observable<User[]>{
    return this._http.get("../assets/mockData/users.json")
    .map((res:Response)=>res.json());
  }

}
