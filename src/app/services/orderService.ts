import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Config } from "../config";
import 'rxjs/Rx';
import { HttpClient, HttpParams } from "@angular/common/http";
declare var toastr: any

@Injectable()

export class OrderService {
    configUrl = new Config().apiUrl
    email = new HttpParams().set('client_id', localStorage.getItem('emailId'))
    constructor(private http: HttpClient) {

    }

    saveSingleOrderData(singleFormData) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: myHeaders });
        return this.http.post(this.configUrl + '/order', { order: singleFormData })
            .catch(err => {
                toastr.error("Something went wrong")
                console.log("Order not saved", err)
                throw new Error(err);
            })
    }

    getClientOrders(clientID) {
        return this.http.get(this.configUrl + '/order/activities',  { params: {query:JSON.stringify({client_id:clientID})}})
        // return this.http.get(this.configUrl + '/order/activities?query={"client_id":"60068294a301d62fe9c23c0d"}')
        // return this.http.get(this.configUrl + '/order', { params: this.email })
    }

    getOrderDetails(orderID) {
        return this.http.get(this.configUrl + '/order/byId/' + orderID)
    }

    getUserActivities(clientID) {
        return this.http.get(this.configUrl + '/order/activities',  { params: {query:JSON.stringify({client_id:clientID})}})
        // return this.http.get(this.configUrl + '/order/activities?query={"client_id":"60068294a301d62fe9c23c0d"}')
        // return this.http.get(this.configUrl + '/order/' + orderID + '/activities', { params: this.email })
        
    }

    getOrderActivities(orderID) {
        return this.http.get(this.configUrl + '/order/' + orderID + '/activities', { params: this.email })
    }

    saveChatData(orderID, data) {
        return this.http.post(this.configUrl + '/order/' + orderID + '/messages', { message: data })
    }

    getOrderMessages(orderID) {
        return this.http.get(this.configUrl + '/order/' + orderID + '/messages')
    }

    fileUpload(file) {
        var fd = new FormData()
        fd.append('file', file)
        return this.http.post(this.configUrl + '/file', fd)
    }

    updateOrder(data: any) {
        return this.http.post(this.configUrl + '/order/update/', data)
    }

    updateStatus(data) {
        let id = data.id
        return this.http.post(this.configUrl + '/order/' + id + '/status/', { order: data })
    }
    getStatusCount() {
        // return this.http.get(this.configUrl + '/order/statusCount', { params: clientId })
        return this.http.get(this.configUrl + '/order/statusCount')
    }

    saveBatchOrder(batchOrderData) {
        return this.http.post(this.configUrl + '/order/batch/', batchOrderData)
    }

    saveFeedbackData(feedbackData, id) {
        return this.http.post(this.configUrl + '/order/feedback/' + id, feedbackData)
    }

    getClientDetails(clientEmailID) {
        return this.http.post(this.configUrl + '/client/clientName', {accountEmail:clientEmailID})
    }

    joinRoom() {
        return this.http.get(this.configUrl + '/auth/joinRoom')
    }

    getProductByClientId(clientId) {
        return this.http.post(this.configUrl + '/client/productBasedOnClient', {clientId: clientId})
    }
    getClientByLender(orderData) {
        return this.http.post(this.configUrl + '/client/landerBasedOnClient', orderData)
    }

    saveProductDetails(orderData) {
        return this.http.post(this.configUrl + '/manage/insertProducts/', orderData)
    }

    getOrderbypage(data){
        return this.http.post(this.configUrl + '/order/getPartialOrders/', data)
    }

    getProductbyID(data){
        return this.http.get(this.configUrl + '/manage/fetchProducts/', data)
    }


}