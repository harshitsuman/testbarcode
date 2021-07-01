import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DatepickerOptions } from "ng2-datepicker";
import { OrderService } from "../../services/orderService";
import Swal from "sweetalert2"
import { Router } from "@angular/router";
declare var $: any
declare var toastr: any 

@Component({
    selector: 'app-batch-order',
    templateUrl: './batch-order.html',
    styleUrls: ['./batch-order.scss']
})

export class BatchOrderComponent {

    expected_due_date: string;
    batchDescription: string;
    projectedCloseDate
    showLoader: boolean
    fileDetails : Array<any>

    constructor(private orderService:OrderService,private router:Router){
        this.fileDetails = []
    }

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

    handlerDatepicker() {
        // this.projectedCloseDateError = false;
        const val = $('#my-date-picker').val();
        if (val) {
            this.projectedCloseDate = true;
        } else {
            this.projectedCloseDate = false;
        }
    }

    onSubmit(form: NgForm) {

        const data = {
            fileLocation:this.fileDetails,
            description: form.value.batchDescription,
            due_date:form.value.expected_due_date.toString()
        }

        console.log(data,"batch form Data")

        Swal.fire({
            imageUrl: '/assets/warning-sweet-alert.svg',
            imageWidth: 57,
            imageHeight: 57,
            title: 'Are you sure?',
            text: 'You want to create this Batch Order?',
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

    saveOrderData(data){
        console.log("batch final data",data)
        this.orderService.saveBatchOrder(data)
        .subscribe(obj => {
            toastr.success("Batch order Created Successfully")
            this.router.navigate(['./myOrder']);
        },error => {
            toastr.error("Something went wrong")
            console.log('Order Creation failed', error);
        }
        );
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

    onReset(form: NgForm){
        form.resetForm();
        this.fileDetails.splice(0, 1);
    }

}