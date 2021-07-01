import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/orderService";
import { ActivatedRoute,Router } from "@angular/router";
import Swal from "sweetalert2";
import OrderType from "../../services/orderTypeService";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Config } from '../../config';

@Component({
    selector:'app-order-detailed-view',
    templateUrl:'./order-detailed-view.html',
    styleUrls:['./order-detailed-view.scss']
})

export class OrderDetailedViewComponent implements OnInit{

    orderData
    defaultOrderTypes = OrderType.types()
    orderStatus: any;
    configUrl = new Config().apiUrl
    constructor(private orderService:OrderService,private route:ActivatedRoute,private router:Router,private ngxUiLoader:NgxUiLoaderService){
    }

    ngOnInit(){
        this.route.params.subscribe(p=>{
            this.getOrderDetails(p.id)
        })
    }

    getOrderDetails(orderID){
        // this.ngxUiLoader.start();
        this.orderService.getOrderDetails(orderID).subscribe(data =>{
            // console.log(data , "orderData")
            // console.log('Order Status : ', data['status'])
            this.orderStatus = data['status'];
            this.orderData = data
        })
            // this.ngxUiLoader.stop();
            // this.downloadReport(orderID);
    }

    cancelOrder() {
        
        console.log("checkedddd")
        let data = {}
        data['status'] = "Cancelled"
        data['id'] = this.orderData._id

        Swal.fire({
            imageUrl: '/assets/warning-sweet-alert.svg',
            imageWidth: 57,
            imageHeight: 57,
            title: 'Are you sure?',
            text: "You want to cancel this order?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A8E8',
            cancelButtonColor: '#F4F5F8',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
                this.orderService.updateStatus(data).subscribe(data => {
                    // console.log(data,"dadadadadad")
                    this.router.navigateByUrl('/myOrder?tab=Cancelled')
                    })
            }
          })

       
        }

        downloadReport(){
            // console.log(this.orderData._id);
            window.open(this.configUrl + '/file/ejs/' + this.orderData._id, 'popup', 'width=800,height=800')
        }

}