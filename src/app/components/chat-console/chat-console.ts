import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { NgForm } from '@angular/forms';
import { OrderService } from '../../services/orderService';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'app-chat-console',
    templateUrl:'./chat-console.html',
    styleUrls:['./chat-console.scss']
})

export class ChatConsoleComponent implements OnInit{

    @Output() messageEvent = new EventEmitter<string>();

    chatInput
    orderID
    chatData
    defaultChatValue : string 
    fileDetails:Array<any>
    showLoader

    constructor(private orderService:OrderService,private route:ActivatedRoute){
    }

    ngOnInit(){
        this.defaultChatValue = ''
        this.route.params.subscribe(obj => {
            this.orderID = obj.id
        })
        this.fileDetails=[]
    }

    onSubmit(form : NgForm){
        console.log(form.value)
        this.chatData = form.value
        this.chatData.files = this.fileDetails
        this.saveData()
        this.fileDetails=[]
        this.messageEvent.emit(this.chatData)
        this.defaultChatValue = ''
    }

    saveData() {
          this.orderService.saveChatData(this.orderID, this.chatData).subscribe(obj => {
            console.log(obj)
          })
    }
    
    uploadFile(event) {
        this.showLoader = true
        // var validExts = new Array(".xlsx", ".xls", ".csv",".pdf");
        // var fileExt = event;
        // fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        // if (validExts.indexOf(fileExt) < 0) {
        // 	toastr.error("Invalid file type, only Excel or CSV data file allowed!");
        // 	return false;
        // }
        // else {
        var newFile = event.files[0];
        let fileReader = new FileReader();

        fileReader.readAsArrayBuffer(newFile);
        console.log(newFile)
        this.orderService.fileUpload(newFile).subscribe(obj => {
            console.log(obj, "uploaded")
            // this.fileDetails.push(obj)
            this.fileDetails.push(obj)

            this.showLoader = false
        })
    }
    

}