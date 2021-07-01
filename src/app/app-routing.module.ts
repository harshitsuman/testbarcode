import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DummyPageComponent} from "./pages";
import { MyOrderComponent, orderDetailPageComponent, CreateOrderPageComponent, CreateBatchOrderComponent, OrderFeedbackPageComponent 
, CreateBarcodeComponent} from "./pages";
import { NgDatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from "ng2-tooltip-directive";
import { LoginComponent ,FirstTimeLoginComponent } from './components';
import { BarcodeGenerateComponent } from './components/barcode-generate/barcode-generate.component';

const routes: Routes = [
  {
    path: 'dummy',
    component: DummyPageComponent
  },
  { path:'',component:MyOrderComponent},
  {
    path: 'myOrder',
    component: MyOrderComponent
  },
  {
    path: 'orderDetail/:id',
    component: orderDetailPageComponent
  },
  {
    path: 'createOrder',
    component: CreateOrderPageComponent
  },
  {
    path: 'createBatchOrder',
    component: CreateBatchOrderComponent
  },
  {
    path: 'orderFeedback/:id',
    component: OrderFeedbackPageComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'firstTimeLogin',
    component: FirstTimeLoginComponent
  },
  {
    path:'createBarcode',
    component: CreateBarcodeComponent
  }
]
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes, { enableTracing: false }),
    NgDatepickerModule,
    BrowserAnimationsModule,
    TooltipModule
  ],
  exports: [RouterModule,NgDatepickerModule],
  declarations: []
})
export class AppRoutingModule { }
