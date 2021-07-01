import { Component, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "../../services/loginService";
import { Router, ActivatedRoute } from "@angular/router";
declare var toastr:any


@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})

export class LoginComponent {
    loginState
    modalState
    login_username
    login_password
    secret

    constructor(private loginService:LoginService,private router:Router,private route:ActivatedRoute){}

    ngOnInit() {
        this.loginState = 'login'
        this.modalState = 'resetPwdModal'
        this.route.queryParams.subscribe( p=> {
            this.secret = p.code
        })
    }

    changeLoginState(state) {
        this.loginState = state
    }

    changeModalState(state) {
        this.modalState = state
    }

    onSubmit(form: NgForm) {
        console.log(form.value)
        this.login_username = form.value.login_username
        this.login_password = form.value.login_password
        this.sendTempPassword()
            const data = {
                email : form.value.login_username,
                password : form.value.login_password,
                type: "client"
            }
            this.login(data)
        
    }

    login(data){
        if(this.secret && this.login_username && this.login_password){
            this.router.navigate(['/firstTimeLogin'],{queryParams:{code:this.secret}});
        }
        else{
            this.loginService.loginToApp(data).subscribe(obj=>{
                console.log(obj,"login response")
                if (obj.client === 'incorrectEmail') {
                    toastr.error("Incorrect email ID")
                }
                else if (obj.client.access) {
                    this.router.navigate(['./myOrder'])
                    localStorage.setItem('emailId',this.login_username)
                    window.localStorage.setItem ('access_token',obj.client.access_token)
                }
                else {
                    toastr.error("Incorrect Password")
                }
                
            },error => {
                toastr.error("Something went wrong")
                console.log("Login Failed",error)
            })
        }
    }

    sendTempPassword(){
        this.loginService.setValue(this.login_password)
    }

}