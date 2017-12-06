import { Injectable } from '@angular/core';
import { Http, Response, HttpModule, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
@Injectable()
export class CancelOrderService {
    orderNumbers = [];
    orderNumberURL = "./assets/mockData/orderData.json";
    cancelOrderURL = "";
    constructor(private http: Http) { }
    getOrderNumbers() {
        return this.http.get(this.orderNumberURL).map((res: Response) => this.orderNumbers = res.json())
    }
    cancelOrder(orderID) {
        console.log(orderID);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.cancelOrderURL, { "orderId": orderID }, options)
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