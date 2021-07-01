import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService';
import { OrderService } from "../../services/orderService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // host: {
  //   '(document:click)': 'hideNotification($event)',
  // },
})
export class HeaderComponent implements OnInit {

  showNotification
  clientEmail
  clientName

  constructor(private router: Router,private loginService:LoginService, private orderService: OrderService) { }

  ngOnInit() {
    this.getClientDetails()
  }

  toggleNotification() {
    console.log("notification")
    this.showNotification = !this.showNotification
  }
  @Output() searchEvent = new EventEmitter()

  refresh() {
    console.log("seracheenr")
    this.searchEvent.emit(false)
    this.router.navigate(['/myOrder'])
  }

  onClickedOutside(event){
    this.showNotification = false;
  }

  getClientDetails(){
    this.clientEmail = localStorage.getItem('emailId')
    this.orderService.getClientDetails(this.clientEmail).subscribe((data:any) => {
      this.clientName = data.client.companyName
    })
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
