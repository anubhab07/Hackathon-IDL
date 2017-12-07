import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { PlaceOrderService } from './place-order.service';
<<<<<<< HEAD
import { Order } from './order';
import {MapLocationService} from "../map/map-location.service";
import {FetchUserService} from "../login/fetch-user.service"

=======
import { Order } from './order'
>>>>>>> d5ca25d8509f6b47f91ae939bf24be8127b94817
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  imageUrl: string = "../assets/images/pizza.jpg";
  deliveryLocations = [];
  shippingCosts = [];
  validOrder = false;
  orderSubmitted = false;
  mobile = "";
  deliveryLocation = "";
  order = new Order();
<<<<<<< HEAD
  orderSuccess=false;
  
=======
  orderSuccess = false;
  shippingCost = 0;
  deliveryType = "Bike";
>>>>>>> d5ca25d8509f6b47f91ae939bf24be8127b94817
  constructor(private placeOrderService: PlaceOrderService) { }

  ngOnInit() {
    this.placeOrderService.getLocations().subscribe(res => {
      this.deliveryLocations = res;
      if (this.deliveryLocations.length > 0) {
        this.deliveryLocation = this.deliveryLocations[0];
      }
<<<<<<< HEAD

    })
=======
    })

    this.placeOrderService.getShippingCosts().subscribe(res => {
      this.shippingCosts = res;
      this.calculateShippingCost();
    })
  }
  changeDeliveryType(type) {
    this.deliveryType = type;
    this.calculateShippingCost();
>>>>>>> d5ca25d8509f6b47f91ae939bf24be8127b94817
  }

   calculateShippingCost() {
    this.shippingCosts.forEach(element => {
      if (element.type == this.deliveryType) {
        this.shippingCost = element.cost;
      }
    });
  }
  setLocation(loc) {
    this.deliveryLocation = loc;
  }
  submitOrder() {
    this.validOrder = false;
    this.orderSubmitted = true;
    if (this.mobile != "" && this.mobile != undefined) {
      if (/^\d{10}$/.test(this.mobile)) {
        this.validOrder = true;
        this.order.userName = sessionStorage.getItem('user');
        this.order.location = this.deliveryLocation;
        this.order.mobileNumber = this.mobile;
<<<<<<< HEAD
        this.placeOrderService.placeOrder(this.order).subscribe(order=>{
          this.orderSuccess=true;
=======
        this.order.deliveryType=this.deliveryType;
        this.placeOrderService.placeOrder(this.order).subscribe(order => {
          this.orderSuccess = true;
>>>>>>> d5ca25d8509f6b47f91ae939bf24be8127b94817
        });
      }
    }
  }
}
