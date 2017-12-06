import { Component, OnInit } from '@angular/core';
import { CancelOrderService } from './cancel-order.service';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {
  orderNumbers = [];
  orderNumber = "--select--";
  imageUrl: string = "../assets/images/pizza.jpg";
  isCancelled=false;
  isCancellationSuccess=false;
  constructor(private cancelOrderService: CancelOrderService) { }

  ngOnInit() {
    this.cancelOrderService.getOrderNumbers().subscribe(res => {
      this.orderNumbers = res;
    })  
  }
  setOrderNumber(oNumber) {
    this.orderNumber = oNumber;
  }
  cancelOrder(){
    this.isCancelled=true;
     this.cancelOrderService.cancelOrder(this.orderNumber).subscribe(order=>{
          this.isCancellationSuccess=true;
        });
  }
}
