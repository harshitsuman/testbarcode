import { Component, OnInit } from "@angular/core";
import { OrderService } from '../../services/orderService';
import { ActivatedRoute } from "@angular/router";
declare const $
@Component({
    selector:'app-order-navbar',
    templateUrl:'./order-navbar.html',
    styleUrls:['./order-navbar.scss']
})

export class OrderNavbarComponent implements OnInit{

    orderOverview;

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) {
        this.orderOverview = {};

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(p => {
            this.getOrderOverviewData(p.id);
        });
    }

    getOrderOverviewData(orderID) {
        this.orderService.getOrderDetails(orderID).subscribe(data => {
            this.orderOverview = data;
            console.log(this.orderOverview);
        });
    }

    // callJqueryMethod(){
    //     $(document).ready(function(){
    //         console.log("document is ready")
    //         $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
           
    //             console.log(e.target, "current tab ")
    //           })
    //        }
        
}