import { Component,OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderService';
import Swal from "sweetalert2";
declare var toastr: any;

@Component({
    selector:'app-files',
    templateUrl:'./files.html',
    styleUrls:['./files.scss']
})

export class FilesComponent implements OnInit{

    orderFiles:Array<any>
    orderCreatedAt
    showLoader
    fileDetails
    orderID

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) {
        this.orderFiles = []
        this.fileDetails = []
    }

    ngOnInit(){
        this.activatedRoute.params.subscribe(obj => {
            this.getOrderFilesData(obj.id);
            this.orderID = obj.id
        })
    }

    getOrderFilesData(orderID) {
        this.orderService.getOrderDetails(orderID).subscribe((data:any) => {
            // console.log('Files Data : ',data)
            this.orderFiles = data.fileLocation?data.fileLocation:[0];
            this.orderCreatedAt = data.created_at
            // console.log('File Location : ',this.orderFiles);
        });
    }

    uploadFiles(event) {
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
            this.orderFiles.push(obj);
            console.log(this.orderFiles)
            this.showLoader = false;
            this.orderService.updateOrder({fileLocation:this.orderFiles,_id:this.orderID}).subscribe(obj => {
                console.log(obj,"updated")
                console.log(this.orderFiles)
            })
        },
        error => {
            toastr.error("Somethiing went wrong")
            console.log("File Upload failed",error)
        });
    }

    deleteFile(i) {
        Swal.fire({
            imageUrl: '/assets/warning-sweet-alert.svg',
            imageWidth: 57,
            imageHeight: 57,
            title: 'Are you sure?',
            text: "You want to delete this file?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A8E8',
            cancelButtonColor: '#F4F5F8',
            confirmButtonText: 'Yes'
          }).then((result) => {
                if (result.value) {
                    this.orderFiles.splice(i, 1)
                    this.orderService.updateOrder(this.orderFiles).subscribe(data => {
                        console.log(data)
                        toastr.success("File deleted successfully")
                    })
                }
          })
        
    }

}