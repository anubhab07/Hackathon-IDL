import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  imageUrl: string = "../assets/images/pizza.jpg";
  deliveryLocations = ["Infosys Patia", "Damana Chowk", "Jaydev Vihar", "Khandagiri"];
  validOrder = false;
  orderSubmitted = false;
  mobile = "";
  constructor() { }

  ngOnInit() {
  }
  submitOrder() {
    this.validOrder = false;
    this.orderSubmitted = true;
    if (this.mobile != "" && this.mobile != undefined) {
      if (/^\d{10}$/.test(this.mobile)) {
        this.validOrder = true;
      }
    }
  }
}
