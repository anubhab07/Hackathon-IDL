import { Injectable } from '@angular/core';
import { Http, Response, HttpModule, Headers, RequestOptions } from "@angular/http";
import { Order } from './order';
import { Observable } from 'rxjs';
@Injectable()
export class PlaceOrderService {
  locations = [];
  shippingcosts=[];
  locationURL = "./assets/mockData/locationData.json";
  placeOrderURL = "";
  shippingCostURL="./assets/mockData/shippingCostData.json"
  constructor(private http: Http) { }
  getLocations() {
    return this.http.get(this.locationURL).map((res: Response) => this.locations = res.json())

  }

  getShippingCosts() {
    return this.http.get(this.shippingCostURL).map((res: Response) => this.shippingcosts = res.json())
  }

  placeOrder(order: Order) {
    console.log(order);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.placeOrderURL, order, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
