import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../services/orderService";

@Component({
  selector: 'app-barcode-generate',
  templateUrl: './barcode-generate.component.html',
  styleUrls: ['./barcode-generate.component.scss']
})
export class BarcodeGenerateComponent implements OnInit {
  client_id: any;
  products: any = [];

  constructor(private orderService: OrderService) { }
  elementType = 'img';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  get values(): string[] {
    return this.value.split('\n');
  }
  codeList: string[] = [
    '', 'CODE128',
    'CODE128A', 'CODE128B', 'CODE128C',
    'UPC', 'EAN8', 'EAN5', 'EAN2',
    'CODE39',
    'ITF14',
    'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
    'pharmacode',
    'codabar'
  ];

  ngOnInit() {

    this.orderService.joinRoom().subscribe(data => {
      console.log('Data : ',data['unique_id'])
      this.client_id = data['unique_id']
    })
    this.orderService.getProductbyID(this.client_id).subscribe((data: any) => {
      console.log('product : ',data);
      this.products = data;
    })
  }

}
