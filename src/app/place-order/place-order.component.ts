import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { PlaceOrderService } from './place-order.service';
import { Order } from './order'
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
  orderSuccess = false;
  shippingCost = 0;
  deliveryType = "Bike";
  constructor(private placeOrderService: PlaceOrderService) { }

  ngOnInit() {
    this.placeOrderService.getLocations().subscribe(res => {
      this.deliveryLocations = res;
      if (this.deliveryLocations.length > 0) {
        this.deliveryLocation = this.deliveryLocations[0];
      }
    })

    this.placeOrderService.getShippingCosts().subscribe(res => {
      this.shippingCosts = res;
      this.calculateShippingCost();
    })
  }
  changeDeliveryType(type) {
    this.deliveryType = type;
    this.calculateShippingCost();
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
        this.order.deliveryType=this.deliveryType;
        this.placeOrderService.placeOrder(this.order).subscribe(order => {
          this.orderSuccess = true;
        });
      }
    }
  }
}
