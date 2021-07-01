import { Component } from "@angular/core";

@Component({
    templateUrl:'./create-order.html',
    styleUrls:['./create-order.scss']
})
export class CreateOrderPageComponent{

    productType 

    sendProductEvent(response:string){
        this.productType = response
    }

}