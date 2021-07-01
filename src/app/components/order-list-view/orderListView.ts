import { Component, Input } from "@angular/core"
import { OrderService } from "../../services/orderService";
import { searchService } from "../../services/searchService";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MyOrderComponent } from "../../pages/my-order/my-order"
// import OrderType from "src/app/services/orderTypeService";

@Component({
    selector: 'order-list-view',
    templateUrl: './orderListView.html',
    styleUrls: ['./orderListView.scss']
})

export class OrderListViewComponent {

    orders: any
    status: any
    apiData
    modifiedData: any
    search: boolean
    temporaryStatus = "showALL"
    temporaryTypes = "showALL"
    temporaryCounty = "showALL"
    temporaryStates = "showALL"
    sortValue: boolean
    // statusSearch
    // typeSearch
    client_id

    @Input()
    orderStatusFilter

    @Input()
    searchEvent

    @Input()
    orderType

    @Input()
    county

    @Input()
    state
    query: {};
    p: number;
    statuss: any;
    statusCount: Object;

    constructor(private orderService: OrderService, private searchService: searchService,private ngxUiLoader:NgxUiLoaderService,
        private myOrderComponent: MyOrderComponent) {

    }
    @Input()
    viewState

    ngOnInit() {
        this.p = 1;
        this.ngxUiLoader.start();
        this.status = 'Open'
        //this.modifiedData = []
        this.search = false
        this.viewState = 'list'
        this.sortValue = false
        this.orders = []
        this.orderService.joinRoom().subscribe(data => {
            // console.log('Data : ',data['unique_id'])
            this.client_id = data['unique_id']
        })
        // var data ={
        //     'pageNO': this.p,
        //     'status': "Open"
        // }

        

        // this.orderService.getOrderbypage(data).subscribe((data: any) => {
        //     // console.log('All orders ',data)
        //     this.apiData = data
        //     this.orders = data.filter(o => o.status === 'Open')
        //     this.ngxUiLoader.stop();
        // })
       
        this.getAllordersdata(this.status);
        this.getStatusdata();
        // this.orderService.getClientOrders(this.client_id).subscribe((data:Array<any>) => {
        //     console.log(data, "data")
        //     this.apiData = data
        //     // this.orders = data.filter(o => o.status === 'Open')
        //     this.ngxUiLoader.stop();
        // })

    }

    ngOnChanges(change) {
        var cStatus = this.myOrderComponent.getStatusdata();
        console.log("orderStatusFilter", change)
        this.getAllordersdata(cStatus);
        if (change.searchEvent) {
            this.search = change.searchEvent.currentValue
            this.orders = this.search ? this.apiData.filter(o => o.status == this.status) : this.apiData
            
        }
        else if (change.orderStatusFilter) {
            if (this.orders) {
                if (!change.orderStatusFilter.currentValue[0].itemName && change.orderStatusFilter.currentValue != "showALL") {
                    this.status = change.orderStatusFilter.currentValue
                }

                if (change.orderStatusFilter.currentValue == this.status) { this.orders = this.apiData.filter(o => o.status === this.status) }

                else {
                    this.temporaryStatus = change.orderStatusFilter.currentValue[0].itemName ? change.orderStatusFilter.currentValue[0].itemName : change.orderStatusFilter.currentValue
                }
            }
            else {
                this.orderService.getClientOrders(this.client_id).subscribe(data => {
                    this.apiData = data
                    this.orders = this.apiData.filter(o => o.status === change.orderStatusFilter.currentValue)
                })

            }
        }

        else if (change.orderType) {
            this.temporaryTypes = change.orderType.currentValue[0].itemName ? change.orderType.currentValue[0].itemName : change.orderType.currentValue
            this.temporaryTypes = this.temporaryTypes.replace(/\s/g, "_")
        }

        else if (change.county) {
            console.log("checked",change)
            this.temporaryCounty = change.county.currentValue[0].County ? change.county.currentValue[0].County : change.county.currentValue
        }

        else if (change.state) {
            this.temporaryStates = change.state.currentValue[0].name ? change.state.currentValue[0].name : change.state.currentValue
        }
       if(this.search)
        this.orders = this.searchService.searchFilter(this.apiData, this.temporaryStatus, this.temporaryCounty, this.temporaryStates, this.temporaryTypes);

    }

    sort(value) {
        this.sortValue = !this.sortValue
        this.orders = this.sortByKey(value)
    }

    sortByKey(value) {
        return this.orders.sort((a, b) => {
            var x = (value == 'pricing') ? parseInt(a[value]) : (value == 'property') ? a['property'].address : a[value]
            var y = (value == 'pricing') ? parseInt(b[value]) : (value == 'property') ? b['property'].address : b[value]
            return this.sortValue ? ((x < y) ? -1 : ((x > y) ? 1 : 0)) : ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    onCustomEvent(response: string) {
        console.log(response)
    }

    receiveTabStatus(event) {
        console.log(event, "tabEvent")

    }

    getAllordersdata(status){
        // console.log(status);
        if (status == 'Submitted'){
            var CurrentStatus = 'AdminSubmitted';
        }else{
            CurrentStatus = status
        }
        var data ={
            'pageNO': this.p,
            'status': CurrentStatus
        }
        this.orderService.getOrderbypage(data).subscribe((data: any) => {
            // console.log('All orders ',data)
            this.apiData = data
            this.orders = data.filter(o => o.status === CurrentStatus)
            this.ngxUiLoader.stop();
            this.getStatusdata();
        })
    }

    getStatusdata(){
        this.orderService.getStatusCount().subscribe(data => {
            this.statusCount = data
            // console.log('count : ', data);
          })
    }

}