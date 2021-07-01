import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Config } from "../config";
import 'rxjs/Rx';
declare var toastr : any

@Injectable()

export class LoginService{

    tempValue

    configUrl = new Config().apiUrl

    constructor(private http:Http){}

    activateClient(data){
        return this.http.post(this.configUrl + '/client/activation' ,{client:data}).map(res=> res.json())
    }

    loginToApp(data){
        return this.http.post(this.configUrl + '/auth/login',data).map(res=> res.json())
    }

    // getClientDetails(clientEmailID) {
    //     return this.http.post(this.configUrl + '/client/clientName', {accountEmail:clientEmailID}).map(res=> res.json())
    // }

    setValue(value){
        this.tempValue = value
        return
    }

    getValue(){
        return this.tempValue
    }
}