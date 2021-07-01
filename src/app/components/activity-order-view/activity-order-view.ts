import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../services/orderService";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-activity-order-view',
  templateUrl: './activity-order-view.html',
  styleUrls: ['./activity-order-view.scss']
})
export class ActivityOrderViewComponent implements OnInit {

  orderActData: any = [];
  today: number;
  yesterday: number;
  rest: number;

  constructor(private orderService:OrderService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(obj=> {
      this.getOrderActivities(obj.id)
    })
  }

  getOrderActivities(orderID){
    this.orderService.getOrderActivities(orderID).subscribe((data: any) => {
    this.orderActData = data;
    // console.log('Activity Order : ',Object.keys(data.today).length);
    // console.log('Activity Order type : ',typeof(data.today));
    this.today = Object.keys(data.today).length;
    this.yesterday = Object.keys(data.yesterday).length;
    this.rest = Object.keys(data.rest).length
    })
  }

}
