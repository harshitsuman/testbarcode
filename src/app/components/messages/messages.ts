import { Component, Input, OnInit } from "@angular/core";
import { OrderService } from '../../services/orderService';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'app-messages',
    templateUrl:'./messages.html',
    styleUrls:['./messages.scss']
})

export class MessagesComponent implements OnInit{

    orderID
    messages
    hideEmptyMsg

    constructor(private orderService:OrderService,private route:ActivatedRoute){}

    ngOnInit(){
        this.route.params.subscribe(obj =>{
            this.orderID = obj.id
            this.getMessages(this.orderID)
        })
    }

    getMessages(orderID){
        this.orderService.getOrderMessages(orderID).subscribe(obj => {
            this.messages = obj;
        })
    }
    ngOnChanges(changes){
        console.log(changes)
    }

    startChat(){
        this.hideEmptyMsg = true
    }

    // @Input('event')
    // updateMessages(){
    //     this.messages.push(event)
    //     console.log("msg from event",event)
    // }

}