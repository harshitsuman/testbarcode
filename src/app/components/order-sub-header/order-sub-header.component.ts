import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {EventDispatcher} from 'event-dispatch';

@Component({
  selector: 'app-order-sub-header',
  templateUrl: './order-sub-header.component.html',
  styleUrls: ['./order-sub-header.component.scss']
})


export class OrderSubHeaderComponent {

  isSearchVisible: boolean;
  
  constructor() { }


  public toggleOrderView() {
    // this.orderView = false
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.dispatch('onClickOrderViewTab');
    // this.order.toggleOrderView()
    // this.orderView= !this.orderView
  }

}
