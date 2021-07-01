import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../services/orderService";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  actData
  clientEmail: string;
  clientId: any;

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    // this.getAllActivities()
    this.getClientDetails()
  }
  getClientDetails(){
    this.clientEmail = localStorage.getItem('emailId')
    this.orderService.getClientDetails(this.clientEmail).subscribe((data:any) => {
      this.clientId = data.client._id
    //   console.log('Data1 : ',this.clientId);
      this.getAllActivities(this.clientId);
      
    })
  }

  getAllActivities(clientId){
    this.orderService.getUserActivities(clientId).subscribe(activityData => {
    this.actData = activityData
    // console.log('Act Data',this.actData)
    // console.log('Act Data lenght ',this.actData.today)
    })
  }

}
