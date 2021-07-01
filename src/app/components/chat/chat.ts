import { Component, ViewChild } from "@angular/core";
import { MessagesComponent } from "../messages/messages";
import { OrderService } from "../../services/orderService";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})

export class ChatComponent {

  hideChatComponent

  @ViewChild(MessagesComponent) messageComp

  constructor(private orderService: OrderService) {

  }

  receiveMessage(event){
    console.log(event)
    this.hideChatComponent = 
    this.messageComp.messages.push({ message: event.chatInput,created_at : new Date(),fileLocation: event.files })
    console.log(this.messageComp.messages)
  }


}