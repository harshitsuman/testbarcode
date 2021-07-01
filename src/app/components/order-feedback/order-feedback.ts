import { Component } from "@angular/core";
import { OrderService } from "../../services/orderService";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2"
import { ActivatedRoute, Router } from "@angular/router";
declare var toastr:any

@Component({
    selector:'app-order-feedback',
    templateUrl:'./order-feedback.html',
    styleUrls:['./order-feedback.scss']
})

export class OrderFeedbackComponent{

    constructor(private orderService:OrderService,private activatedRoute:ActivatedRoute,private router:Router){

    }
    
    orderID
    VestingError
    MissingDocuments
    TypographicalError
    MissingRequirements
    MissingExceptions
    AdditionalComments
    orderData

    ngOnInit(){
        this.activatedRoute.params.subscribe(p=>{
            this.orderID = p.id
            this.getOrderNumber(this.orderID)
        })
    }

    getOrderNumber(orderID){
        this.orderService.getOrderDetails(orderID).subscribe(data =>{
            console.log(data , "orderData")
            this.orderData = data} )
    }   
    
    onSubmit(form:NgForm){
        
        const data = {
            VestingError: form.value.VestingError,
            MissingDocuments: form.value.MissingDocuments,
            TypographicalError: form.value.TypographicalError,
            MissingRequirements: form.value.MissingRequirements,
            MissingExceptions: form.value.MissingExceptions,
            AdditionalComments: form.value.AdditionalComments,
        }

        console.log("Order feedback data",data)
    
        Swal.fire({
            imageUrl: '/assets/warning-sweet-alert.svg',
            imageWidth: 57,
            imageHeight: 57,
            title: 'Are you sure?',
            text: 'You want to submit this feedback?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A8E8',
            cancelButtonColor: '#F4F5F8',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                this.saveFeedbackData(data);
            }
        });
    }

    saveFeedbackData(data){
        this.orderService.saveFeedbackData(data,this.orderID)
        .subscribe(obj => {
            toastr.success("Feedback Submitted Successfully")
            this.router.navigate(['/orderDetail/this.orderID'])
        },error =>{
            toastr.error("Something went wrong")
            console.log("feedback not submitted",error)
        }
        );
    }

    onReset(form:NgForm){
        form.resetForm();
    }

    

}