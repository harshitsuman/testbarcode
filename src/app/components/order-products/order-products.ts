import { Component, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'app-order-products',
    templateUrl: './order-products.html',
    styleUrls: ['./order-products.scss']
})

export class OrderProductsComponent {

    constructor(private eRef: ElementRef) {
    }

    @Output() sendProductEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() clickEvent = new EventEmitter();


    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (event.target.id == "product") {

        }
        else if (this.eRef.nativeElement.contains(event.target)) {
            console.log("inside")

        }
        else {
            console.log("outside")
            this.clickEvent.emit()
        }
    }

    selectProductType(type: string) {
        this.sendProductEvent.emit(type);
    }

}
