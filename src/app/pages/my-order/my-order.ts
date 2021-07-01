import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderService } from "../../services/orderService";
import { ActivatedRoute } from '@angular/router';
import CountyNames from "../../services/countyNamesService";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-myorder-page',
  templateUrl: './my-order.html',
  styleUrls: ['./my-order.scss'],
  animations: [
    trigger('activityOpenClose', [
      state('open', style({
        transform: 'translateX(0%)',
        opacity: 1,
      })),
      state('closed', style({
        transform: 'translateX(100%)',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.35s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('orderListViewOpenClose', [
      state('compressed', style({
        width: '83.33333%',
        transform: 'translateX(10%)',
      })),
      state('full', style({
        width: '75%',
        transform: 'translateX(0%)',
      })),
      transition('full => compressed', [
        animate('0.35s')
      ]),
      transition('compressed => full', [
        animate('0.5s')
      ]),
    ]),
  ],
})

export class MyOrderComponent implements OnInit {


  public showActivity = true;
  listViewState;

  orderTypeList = [];
  statusList = [];
  selectedOrderTypeItems = [];
  selectedStatusItems = [];
  selectedStateList = [];
  selectedCountyList = [];
  settings = {};
  settings2 = {};
  settings3 = {};
  settings4 = {};
  status
  isOrderTabActive
  stateList: Array<any>
  state
  county
  county_name_list = CountyNames.uniqueCountyNames()
  types
  showNotiStatus
  public search = false
  statusCount: any = {}
  client_id: any;
  p



  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private ngxUiLoader: NgxUiLoaderService) {
    this.activatedRoute.queryParams.subscribe(data => {
      // console.log(data.tab, "datatata")
      if (data.tab) {
        setTimeout(() => {
          this.openOrdersTab(data.tab)
          this.isOrderTabActive = data.tab
        }, 900)


      }
    })
  }

  ngOnInit() {
    this.p = 1
    this.isOrderTabActive = 'Open'


    this.orderTypeList = [
      { 'id': 1, 'itemName': 'Current Owner Search' },
      { 'id': 2, 'itemName': 'Current Owner Search Plus' },
      { 'id': 3, 'itemName': 'Two Owner Search' },
      { 'id': 4, 'itemName': 'Two Owner Search Plus' },
      { 'id': 5, 'itemName': 'Full Search' },
      { 'id': 6, 'itemName': 'Full Search Plus' },
      { 'id': 7, 'itemName': 'Update' },
      { 'id': 8, 'itemName': 'Commitment Typing' },
      { 'id': 9, 'itemName': 'Document Retrieval' },
      { 'id': 10, 'itemName': '30 years Search' },
      { 'id': 11, 'itemName': '30 years Search Plus' }
    ];

    this.statusList = [
      { 'id': 1, 'itemName': 'Open' },
      { 'id': 2, 'itemName': 'Submitted' },
      { 'id': 3, 'itemName': 'Clarification' },
      { 'id': 4, 'itemName': 'Completed' },
      { 'id': 5, 'itemName': 'Cancelled' },
    ]

    this.stateList = [
      {
        "name": "Alabama",
        "abbreviation": "AL"
      },
      {
        "name": "Alaska",
        "abbreviation": "AK"
      },
      {
        "name": "American Samoa",
        "abbreviation": "AS"
      },
      {
        "name": "Arizona",
        "abbreviation": "AZ"
      },
      {
        "name": "Arkansas",
        "abbreviation": "AR"
      },
      {
        "name": "California",
        "abbreviation": "CA"
      },
      {
        "name": "Colorado",
        "abbreviation": "CO"
      },
      {
        "name": "Connecticut",
        "abbreviation": "CT"
      },
      {
        "name": "Delaware",
        "abbreviation": "DE"
      },
      {
        "name": "District Of Columbia",
        "abbreviation": "DC"
      },
      {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
      },
      {
        "name": "Florida",
        "abbreviation": "FL"
      },
      {
        "name": "Georgia",
        "abbreviation": "GA"
      },
      {
        "name": "Guam",
        "abbreviation": "GU"
      },
      {
        "name": "Hawaii",
        "abbreviation": "HI"
      },
      {
        "name": "Idaho",
        "abbreviation": "ID"
      },
      {
        "name": "Illinois",
        "abbreviation": "IL"
      },
      {
        "name": "Indiana",
        "abbreviation": "IN"
      },
      {
        "name": "Iowa",
        "abbreviation": "IA"
      },
      {
        "name": "Kansas",
        "abbreviation": "KS"
      },
      {
        "name": "Kentucky",
        "abbreviation": "KY"
      },
      {
        "name": "Louisiana",
        "abbreviation": "LA"
      },
      {
        "name": "Maine",
        "abbreviation": "ME"
      },
      {
        "name": "Marshall Islands",
        "abbreviation": "MH"
      },
      {
        "name": "Maryland",
        "abbreviation": "MD"
      },
      {
        "name": "Massachusetts",
        "abbreviation": "MA"
      },
      {
        "name": "Michigan",
        "abbreviation": "MI"
      },
      {
        "name": "Minnesota",
        "abbreviation": "MN"
      },
      {
        "name": "Mississippi",
        "abbreviation": "MS"
      },
      {
        "name": "Missouri",
        "abbreviation": "MO"
      },
      {
        "name": "Montana",
        "abbreviation": "MT"
      },
      {
        "name": "Nebraska",
        "abbreviation": "NE"
      },
      {
        "name": "Nevada",
        "abbreviation": "NV"
      },
      {
        "name": "New Hampshire",
        "abbreviation": "NH"
      },
      {
        "name": "New Jersey",
        "abbreviation": "NJ"
      },
      {
        "name": "New Mexico",
        "abbreviation": "NM"
      },
      {
        "name": "New York",
        "abbreviation": "NY"
      },
      {
        "name": "North Carolina",
        "abbreviation": "NC"
      },
      {
        "name": "North Dakota",
        "abbreviation": "ND"
      },
      {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
      },
      {
        "name": "Ohio",
        "abbreviation": "OH"
      },
      {
        "name": "Oklahoma",
        "abbreviation": "OK"
      },
      {
        "name": "Oregon",
        "abbreviation": "OR"
      },
      {
        "name": "Palau",
        "abbreviation": "PW"
      },
      {
        "name": "Pennsylvania",


        "abbreviation": "PA"
      },
      {
        "name": "Puerto Rico",
        "abbreviation": "PR"
      },
      {
        "name": "Rhode Island",
        "abbreviation": "RI"
      },
      {
        "name": "South Carolina",
        "abbreviation": "SC"
      },
      {
        "name": "South Dakota",
        "abbreviation": "SD"
      },
      {
        "name": "Tennessee",
        "abbreviation": "TN"
      },
      {
        "name": "Texas",
        "abbreviation": "TX"
      },
      {
        "name": "Utah",
        "abbreviation": "UT"
      },
      {
        "name": "Vermont",
        "abbreviation": "VT"
      },
      {
        "name": "Virgin Islands",
        "abbreviation": "VI"
      },
      {
        "name": "Virginia",
        "abbreviation": "VA"
      },
      {
        "name": "Washington",
        "abbreviation": "WA"
      },
      {
        "name": "West Virginia",
        "abbreviation": "WV"
      },
      {
        "name": "Wisconsin",
        "abbreviation": "WI"
      },
      {
        "name": "Wyoming",
        "abbreviation": "WY"
      }
    ]

    this.selectedOrderTypeItems = [];
    this.selectedStatusItems = [];
    this.selectedStateList = [];
    this.selectedCountyList = [];

    // select box settings
    this.settings = {
      text: 'Product Type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      enableSearchFilter: true,
      singleSelection: true,
    };

    this.settings2 = {
      text: 'Order Status',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      enableSearchFilter: true,
      singleSelection: true,
    };

    this.settings3 = {
      text: 'County',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      enableSearchFilter: true,
      singleSelection: true,
      primaryKey: "County",
      labelKey: "County",
    };

    this.settings4 = {
      text: 'State',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      enableSearchFilter: true,
      singleSelection: true,
      primaryKey: "name",
      labelKey: "name",
    };
    

    this.orderService.joinRoom().subscribe(data => {
      // console.log('Unique id : ', data['unique_id'])
      this.client_id = data['unique_id'];
    })

    
    this.getStatusCount()
    this.getStatusdata()

  }
  ngOnChanges(change) {
    // console.log(change, "cahndfe")
  }

  showSearch() {
    // this.isSearchVisible = !this.isSearchVisible;
    this.search = !this.search
    this.selectedOrderTypeItems = []
    this.selectedStatusItems = []
  }

  onCustomEvent(response: string) {
    // console.log(response);
    this.listViewState = response;
  }

  public toggleActivity() {
    this.showActivity = !this.showActivity;
  }

  @Output() tabStatusEvent = new EventEmitter();

  openOrdersTab(val) {
    this.ngxUiLoader.start();
    // console.log(val)
    this.status = val.length == 0 ? "showALL" : val
    // console.log('Status', this.status);
    this.getStatusCount()
  }
  selectedOrderType(val) {
    // console.log(val[0].itemName.replace(" ","_"),"sdsadssd")
    this.types = val.length == 0 ? "showALL" : val
  }
  refresh(event) {
    this.search = event
  }
  countySelection(val) {
    this.county = val.length == 0 ? "showALL" : val
  }
  stateSelection(val) {
    this.state = val.length == 0 ? "showALL" : val
  }

  getStatusdata(){
    return this.status;
  }

  getStatusCount(){
    this.orderService.getStatusCount().subscribe(data => {
      this.statusCount = data
      console.log('count : ', data);
    })
  }

}
