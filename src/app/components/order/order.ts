import { Component, NgZone, Input } from "@angular/core";
import { EventSubscriber, On } from "event-dispatch";

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrls: ['./order.scss']
})

@EventSubscriber()
export class OrderComponent  {

  product_type
  @Input()
  order
  showStatusColumn

  constructor(private zone: NgZone) {

    this.product_type =
      {
        Current_Owner_Search: "Current Owner Search",
        Current_Owner_Search_Plus: "Current Owner Search Plus",
        Two_Owner_Search: "Two Owner Search",
        Two_Owner_Search_Plus: "Two Owner Search Plus",
        Full_Search: "Full Search",
        Full_Search_Plus: "Full Search Plus",
        Update: "Update",
        Commitment_Typing: "Commitment Typing",
        DocumentRetrieval: "Document Retrieval",
        Search_30_years: "Search 30 years",
        Search_Plus_30_years: "Search Plus 30 years"
      }

  }

  ngOnInit(){
    this.showStatusColumn = false
  }
  orderView: boolean = true

  @On("onClickOrderViewTab")
  cardViewToggelHandler() {
    this.orderView = !this.orderView
    // this.toggleOrderView()
  }

  toggleOrderView() {
    console.log("orderView")
    this.zone.runOutsideAngular(() => {
      this.orderView = !this.orderView
    })
  }


    
}