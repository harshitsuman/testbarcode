import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../../services/loginService";
declare var $:any
declare var toastr:any
@Component({
    selector:'app-first-time-login',
    templateUrl:'./first-time-login.html',
    styleUrls:['./first-time-login.scss']
})

export class FirstTimeLoginComponent{
    modalState
    new_password
    verify_password
    secret
    tempPassword

    constructor(private loginService:LoginService,private route:ActivatedRoute){
        this.route.queryParams.subscribe(p=>{
            this.secret=p.code
        })
    }

    ngOnInit(){
        this.modalState = 'resetPwdModal'
        this.receiveTempPwd()
    }

    changeModalState(state){
        this.modalState = state
    }

    onSubmit(form:NgForm){
        console.log(form.value)
        if(form.value.new_password === form.value.verify_password){
            const data = {
                new_password : form.value.new_password,
                password : this.tempPassword,
                secret:this.secret
            }
            this.resetFirstTimePassword(data)
        }
        else{
            toastr.error("Passwords do not match")
        }
        
    }

    resetFirstTimePassword(data){
        this.loginService.activateClient(data).subscribe(obj=>{
            console.log(obj,"Activation successfull")
            this.modalState = 'resetPwdSuccessModal'
        },error => {
            toastr.error("Something went wrong")
            console.log("Activation Failed",error)
        })
    }

    receiveTempPwd(){
        this.tempPassword = this.loginService.getValue()
    }
}