import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { OrderService } from '../../services/orderService';
import orderType from '../../services/orderTypeService';
import CountyNames from '../../services/countyNamesService';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { isArray } from 'util';
declare var toastr: any;
declare var $: any;
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-single-order',
    templateUrl: './single-order.component.html',
    styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit, OnChanges {

    product_type: any;
    client_order_no: string;
    address: string;
    county: string;
    state: string;
    zip_code: number;
    parcel_ids: any;
    purpose: string;
    projected_close_date: string;
    pricing: number;
    borrower_names: Array<any>;
    seller_names: Array<any>;
    showSeller: boolean;
    loan_amount: number;
    purchase_amount: number;
    comments: any;
    attachments: any;
    comment: string;

    order_type: any;
    hideOrderProducts;

    product_type_options = orderType.types();
    county_name_list = CountyNames.names();
    unique_county_names = CountyNames.uniqueCountyNames();
    purpose_list: Array<any>;

    fileDetails: Array<any> = [];
    showLoader;
    stateList: Array<any>;
    selectedStateItems: Array<any>;
    selectedCountyItems: Array<any>;
    selectedPurposeItems: Array<any>;
    selectedPurpose;
    settings;
    settings2;
    settings3;

    productTypeRequiredError: boolean;
    projectedCloseDateError: boolean;
    borrowerNamesError: boolean;
    sellerNamesError: boolean;
    projectedCloseDate: boolean;
    borrowerNames: boolean;
    sellerNames: boolean;
    countyRequiredError: boolean;
    stateRequiredError: boolean;
    purchaseRequiredError: boolean;
    purposeRequiredError: boolean;
    enablePurpose: boolean;
    purposeOpen: boolean;

    pricing_value: number;
    loan_amount_value: string;
    purchase_amount_value: string;

    countyOpen: boolean;
    stateOpen: boolean;
    productTypeOpen: boolean
    productRequiredError: boolean
    productType:any =  []
    selectedProductTypes
    lenderOpen: boolean
    lenderNames: any = []
    lenderRequiredError: boolean
    settings4
    settings5
    client_id: any;
    clientEmail: string;
    clientId: any;
    selectedLender: any = [];

    constructor(private orderService: OrderService, private router: Router, private currency: CurrencyPipe,
        public datepipe: DatePipe) {
        this.showLoader = false;
        this.borrower_names = [];
        this.seller_names = [];
        // this.parcel_ids = [];
        this.showSeller = false;
        this.stateList = [
            {
                'name': 'Alabama',
                'abbreviation': 'AL'
            },
            {
                'name': 'Alaska',
                'abbreviation': 'AK'
            },
            {
                'name': 'American Samoa',
                'abbreviation': 'AS'
            },
            {
                'name': 'Arizona',
                'abbreviation': 'AZ'
            },
            {
                'name': 'Arkansas',
                'abbreviation': 'AR'
            },
            {
                'name': 'California',
                'abbreviation': 'CA'
            },
            {
                'name': 'Colorado',
                'abbreviation': 'CO'
            },
            {
                'name': 'Connecticut',
                'abbreviation': 'CT'
            },
            {
                'name': 'Delaware',
                'abbreviation': 'DE'
            },
            {
                'name': 'District Of Columbia',
                'abbreviation': 'DC'
            },
            {
                'name': 'Federated States Of Micronesia',
                'abbreviation': 'FM'
            },
            {
                'name': 'Florida',
                'abbreviation': 'FL'
            },
            {
                'name': 'Georgia',
                'abbreviation': 'GA'
            },
            {
                'name': 'Guam',
                'abbreviation': 'GU'
            },
            {
                'name': 'Hawaii',
                'abbreviation': 'HI'
            },
            {
                'name': 'Idaho',
                'abbreviation': 'ID'
            },
            {
                'name': 'Illinois',
                'abbreviation': 'IL'
            },
            {
                'name': 'Indiana',
                'abbreviation': 'IN'
            },
            {
                'name': 'Iowa',
                'abbreviation': 'IA'
            },
            {
                'name': 'Kansas',
                'abbreviation': 'KS'
            },
            {
                'name': 'Kentucky',
                'abbreviation': 'KY'
            },
            {
                'name': 'Louisiana',
                'abbreviation': 'LA'
            },
            {
                'name': 'Maine',
                'abbreviation': 'ME'
            },
            {
                'name': 'Marshall Islands',
                'abbreviation': 'MH'
            },
            {
                'name': 'Maryland',
                'abbreviation': 'MD'
            },
            {
                'name': 'Massachusetts',
                'abbreviation': 'MA'
            },
            {
                'name': 'Michigan',
                'abbreviation': 'MI'
            },
            {
                'name': 'Minnesota',
                'abbreviation': 'MN'
            },
            {
                'name': 'Mississippi',
                'abbreviation': 'MS'
            },
            {
                'name': 'Missouri',
                'abbreviation': 'MO'
            },
            {
                'name': 'Montana',
                'abbreviation': 'MT'
            },
            {
                'name': 'Nebraska',
                'abbreviation': 'NE'
            },
            {
                'name': 'Nevada',
                'abbreviation': 'NV'
            },
            {
                'name': 'New Hampshire',
                'abbreviation': 'NH'
            },
            {
                'name': 'New Jersey',
                'abbreviation': 'NJ'
            },
            {
                'name': 'New Mexico',
                'abbreviation': 'NM'
            },
            {
                'name': 'New York',
                'abbreviation': 'NY'
            },
            {
                'name': 'North Carolina',
                'abbreviation': 'NC'
            },
            {
                'name': 'North Dakota',
                'abbreviation': 'ND'
            },
            {
                'name': 'Northern Mariana Islands',
                'abbreviation': 'MP'
            },
            {
                'name': 'Ohio',
                'abbreviation': 'OH'
            },
            {
                'name': 'Oklahoma',
                'abbreviation': 'OK'
            },
            {
                'name': 'Oregon',
                'abbreviation': 'OR'
            },
            {
                'name': 'Palau',
                'abbreviation': 'PW'
            },
            {
                'name': 'Pennsylvania',
                'abbreviation': 'PA'
            },
            {
                'name': 'Puerto Rico',
                'abbreviation': 'PR'
            },
            {
                'name': 'Rhode Island',
                'abbreviation': 'RI'
            },
            {
                'name': 'South Carolina',
                'abbreviation': 'SC'
            },
            {
                'name': 'South Dakota',
                'abbreviation': 'SD'
            },
            {
                'name': 'Tennessee',
                'abbreviation': 'TN'
            },
            {
                'name': 'Texas',
                'abbreviation': 'TX'
            },
            {
                'name': 'Utah',
                'abbreviation': 'UT'
            },
            {
                'name': 'Vermont',
                'abbreviation': 'VT'
            },
            {
                'name': 'Virgin Islands',
                'abbreviation': 'VI'
            },
            {
                'name': 'Virginia',
                'abbreviation': 'VA'
            },
            {
                'name': 'Washington',
                'abbreviation': 'WA'
            },
            {
                'name': 'West Virginia',
                'abbreviation': 'WV'
            },
            {
                'name': 'Wisconsin',
                'abbreviation': 'WI'
            },
            {
                'name': 'Wyoming',
                'abbreviation': 'WY'
            }
        ];
        this.selectedStateItems = [];
        this.selectedCountyItems = [];
        this.selectedPurposeItems = [];

        this.purpose_list = [
            { 'type': 'Refinance' },
            { 'type': 'Purchase' }
        ];
        this.settings = {
            text: '',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class',
            enableSearchFilter: true,
            singleSelection: true,
            primaryKey: 'name',
            labelKey: 'name',
        };
        this.settings2 = {
            text: '',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class',
            enableSearchFilter: true,
            singleSelection: true,
            primaryKey: 'County',
            labelKey: 'County',
        };
        this.settings3 = {
            text: '',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class',
            enableSearchFilter: false,
            singleSelection: true,
            primaryKey: 'type',
            labelKey: 'type',
        };
        this.settings4 = {
            text: 'Select Product Type',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class',
            enableSearchFilter: true,
            singleSelection: true,
            primaryKey: "_id",
            labelKey: "product_name",
          };
        this.settings5 = {
        text: 'Select Lender',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        classes: 'myclass custom-class',
        enableSearchFilter: true,
        singleSelection: true,
        primaryKey: "_id",
        labelKey: "name",
        };

        this.productTypeRequiredError = false;
        this.projectedCloseDateError = false;
        this.borrowerNamesError = false;
        this.sellerNamesError = false;
        this.stateRequiredError = false;
        this.countyRequiredError = false;
        this.purposeRequiredError = false;
    }

    @Input() productName;


    options: DatepickerOptions = {
        minYear: 1970,
        maxYear: 2030,
        displayFormat: 'MMM D[,] YYYY',
        barTitleFormat: 'MMMM YYYY',
        dayNamesFormat: 'dd',
        firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
        barTitleIfEmpty: 'Click to select a date',
        placeholder: '', // HTML input placeholder attribute (default: '')
        fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
        useEmptyBarTitle: false, // Defaults to true.
        // If set to false then barTitleIfEmpty will be
        // disregarded and a date will always be shown
        minDate: new Date()
    };



    ngOnInit() {
        this.hideOrderProducts = true;
        this.enablePurpose = false;
        this.getClientDetails();
    }

    ngOnChanges(productName) {

    }

    getClientDetails(){
        this.clientEmail = localStorage.getItem('emailId')
        this.orderService.getClientDetails(this.clientEmail).subscribe((data:any) => {
          this.clientId = data.client._id
        //   console.log('Data1 : ',this.clientId);
          this.getProductdata(this.clientId);
          this.getLender(this.clientId);
        })
      }


    toggleProductTypeSelection() {
        this.hideOrderProducts = !this.hideOrderProducts;
    }

    hideOrderProductsOnEsc(event) {
        this.hideOrderProducts = true;
    }

    selectedProductType(selected_product_type: string) {
        this.productTypeRequiredError = false;
        this.hideOrderProducts = true;
        this.product_type = selected_product_type;
        if (selected_product_type === 'Full_Search' || selected_product_type === 'Full_Search_Plus') {
            this.showSeller = true;
        } else {
            this.showSeller = false;
        }
        console.log(this.product_type);
    }

    enablePurchaseAmount(event) {
        this.purposeRequiredError = false;
        this.purposeOpen = true;
        this.purchaseRequiredError = false;
        this.selectedPurpose = this.selectedPurposeItems[0].type;
        if (this.selectedPurpose === 'Purchase') {
            this.enablePurpose = true;
        } else {
            this.enablePurpose = false;
        }
        return;
    }

    onSubmit(form: NgForm) {
        const formdata = form.value;
        // const Arr = Object.keys(form.value);
        // console.log('Form Data : ',form.value);
        const data = {
            brand_name:form.value.brand_name,
	        product_name: form.value.product_name,
	        price: form.value.product_price           
        };
        // console.log('final data', data);
        Swal.fire({
            imageUrl: '/assets/warning-sweet-alert.svg',
            imageWidth: 57,
            imageHeight: 57,
            title: 'Are you sure?',
            text: 'You want to create this order?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A8E8',
            cancelButtonColor: '#F4F5F8',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                this.saveOrderData(data);
            }
        });

    }

    onReset(form: NgForm) {
        this.countyRequiredError = false;
        this.stateRequiredError = false;
        this.purposeRequiredError = false;
        this.countyOpen = false;
        this.stateOpen = false;
        this.purposeOpen = false;
        this.projectedCloseDate = false;
        this.borrowerNames = false;
        this.sellerNames = false;
        this.enablePurpose = false
        form.resetForm();
    }

    saveOrderData(data) {
        console.log("final form data",data);
        this.orderService.saveProductDetails(data)
            .subscribe(Obj => {
                toastr.success('Product Created Successfully');
                this.router.navigate(['./myOrder']);
            },
                error => {
                    toastr.error('Something went wrong');
                    console.log('Product Creation failed', error);
                }
            );
    }

    purposeOpenFunction(status){
        this.purposeOpen = status;
    }

    uploadFile(event) {
        this.showLoader = true;
        // var validExts = new Array(".xlsx", ".xls", ".csv",".pdf");
        // var fileExt = event;
        // fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        // if (validExts.indexOf(fileExt) < 0) {
        // 	toastr.error("Invalid file type, only Excel or CSV data file allowed!");
        // 	return false;
        // }
        // else {
        const newFile = event.files[0];
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(newFile);
        console.log(newFile);
        this.orderService.fileUpload(newFile).subscribe(obj => {
            console.log(obj, 'uploaded');
            this.fileDetails.push(obj);
            this.showLoader = false;
        },
            error => {
                toastr.error('Something went wrong');
                console.log('File Upload failed', error);
            });
    }

    removeFile(index) {
        this.fileDetails.splice(index, 1);
    }

    handlerDatepicker() {
        // this.projectedCloseDateError = false;
        const val = $('#my-date-picker').val();
        if (val) {
            this.projectedCloseDate = true;
        } else {
            this.projectedCloseDate = false;
        }
    }

    convertToCurrency(amt, model) {
        if (amt.substring(0, 1) !== '$') {
            amt = this.convertToNumber(amt);
            this[`${model}_value`] = amt;
            this[model] = this.currency.transform(parseInt(amt, 10));
        } else {
            const newVal = this.convertToNumber(amt.substring(1, amt.length));
            this[`${model}_value`] = newVal;
            this[model] = this.currency.transform(parseInt(newVal, 10));
        }
    }

    convertToNumber(currency) {
        if (currency.slice(-3, currency.length) === '.00') {
            currency = currency.slice(0, currency.length - 3);
        }
        return currency.split(',').join('');
    }

    onClickedOutside(event){
        this.hideOrderProducts = true
    }

    

    productTypeSelection(productType){
        // this.showOrderDetailsForm = false;
    }

    deproductTypeSelection(productType){
        // this.selectedProductType = undefined;
        // this.showOrderDetailsForm = false;
    }
    lenderSelection(data) {}

    getProductdata(Id){
        this.orderService.getProductByClientId(Id).subscribe((data: any) => {
            console.log('product type : ', data);
            this.productType = data.productList.data
        })
    }

    getLender(clientid) {
        console.log({clientId: clientid})
        this.orderService.getClientByLender({ clientId: clientid})
        .subscribe( (data:any) => {
          this.lenderNames = data.lenderList.data;
        })
      }

}
