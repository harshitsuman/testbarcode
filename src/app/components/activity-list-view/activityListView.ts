import {Component, OnInit} from "@angular/core"
import { OrderService } from "../../services/orderService";

@Component({
    selector:'app-activity-list-view',
    templateUrl:'./activityListview.html',
    styleUrls:['activityListView.scss']
})

export class activityListViewComponent implements OnInit{

    actData
    actTodayCount
    actYestCount
    actRestCount
    actTotalCount
    clientEmail: string;
    clientId: any;

    constructor(private orderService:OrderService){
        this.actTotalCount = 0;
    }

    ngOnInit(){
      
        this.getClientDetails()
    }

    getClientDetails(){
        this.clientEmail = localStorage.getItem('emailId')
        this.orderService.getClientDetails(this.clientEmail).subscribe((data:any) => {
          this.clientId = data.client._id
        //   console.log('Data1 : ',this.clientId);
          this.getactivityData(this.clientId);
          
        })
    }

    getactivityData(clientId){
        this.orderService.getUserActivities(clientId).subscribe(data => {
        this.actData = data
        this.actTodayCount = this.actData.today.length
        this.actYestCount = this.actData.yesterday.length
        this.actRestCount = this.actData.rest.length
        this.actTotalCount = this.actTodayCount+this.actYestCount+this.actRestCount
    })
    }

}