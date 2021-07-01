import { Component, OnInit, Input, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsComponent implements OnInit {

  showNotification: boolean
  showEmptyMsg
  constructor(private eRef: ElementRef) {
    this.showNotification = true
  }

  @Output() clickEvent = new EventEmitter()

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(event.target.id=='noti'){
    }
    else if (this.eRef.nativeElement.contains(event.target)) {
    } 
    else {
      this.clickEvent.emit()
    }
  } 


  ngOnInit() {
    this.showNotification = false
    this.showEmptyMsg = true;
  }

  @Input() showNotiStatus

  hideNotifications() {
    this.showEmptyMsg = true;
    this.showNotification = false;
  }

}
