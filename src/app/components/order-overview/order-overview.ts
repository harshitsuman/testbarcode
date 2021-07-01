import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/orderService';
import OrderType from "../../services/orderTypeService";
import { NgxUiLoaderService } from "ngx-ui-loader";

interface Names {
    value: string;
}

@Component({
    selector: 'app-order-overview',
    templateUrl: './order-overview.html',
    styleUrls: ['./order-overview.scss']
})
export class OrderOverviewComponent implements OnInit {
    orderOverview;
    orderId
    messages: any = [];
    defaultOrderTypes = OrderType.types()
    defaultOrderDescriptions = OrderType.productDescription()

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService,private router:Router,private ngxUiLoader:NgxUiLoaderService) {
        this.orderOverview = {};
    }


    ngOnInit() {
        // this.ngxUiLoader.start();
        this.activatedRoute.params.subscribe(p => {
            this.orderId = p.id
            this.getOrderOverviewData(p.id);
        });
        this.getMessages(this.orderId)
    }
    
    getOrderOverviewData(orderID) {
        this.ngxUiLoader.start();
        this.orderService.getOrderDetails(orderID).subscribe(data => {
            this.orderOverview = data;
            console.log('Order Details : ',this.orderOverview);
            // setTimeout(() => {
            //     this.ngxUiLoader.stop(); // stop foreground spinner of the master loader with 'default' taskId
            //   }, 1000)
            this.ngxUiLoader.stop();
        });
      
    }

    updateStatusToCompleted() {
        let data = {}
        data['status'] = 'Completed'
        data['id'] = this.orderId
        this.orderService.updateStatus(data).subscribe(res => {
            // console.log("order completed", res)
            this.router.navigateByUrl('/myOrder?tab=Completed')
        })
        
    }

    flattenNames(names: Array<Names>) {
        if (names) {
            const arr = names.map(o => o.value);
            return arr ? arr.join(', ') : '';
        }
    }
    updateStatus() {
        console.log("checkeddd")
        var data = {}
        data['status'] = "Submitted"
        data['id'] = this.orderId
        this.orderService.updateStatus(data).subscribe(data => {
            this.router.navigateByUrl('/myOrder?tab=Submitted')
            })
      

    }

    getMessages(orderID){
        this.orderService.getOrderMessages(orderID).subscribe(obj => {
            this.messages = obj;
            // console.log('Message Data : ', obj)
        })
    }

}
