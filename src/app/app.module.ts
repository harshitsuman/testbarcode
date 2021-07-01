import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
import { NgxBarcodeModule } from 'ngx-barcode';
import {
  HeaderComponent,
  HomeComponent,
  SingleOrderComponent,
  OrderSubHeaderComponent,
  OrderComponent,
  OrderListViewComponent,
  activityListViewComponent,
  ActivityComponent,
  OrderDetailedViewComponent,
  OrderNavbarComponent,
  ChatComponent,
  MessagesComponent,
  ChatConsoleComponent,
  FilesComponent,
  SearchComponent,
  BatchOrderComponent,
  OrderProductsComponent,
  OrderOverviewComponent,
  SubmissionsComponent,
  OrderFeedbackComponent,
  ActivityOrderViewComponent,
  NotificationsComponent,
  LoginComponent,
  FooterComponent,
  FirstTimeLoginComponent
} from './components';
import {
  DummyPageComponent,
  MyOrderComponent,
  orderDetailPageComponent,
  CreateOrderPageComponent,
  CreateBatchOrderComponent,
  OrderFeedbackPageComponent,
  CreateBarcodeComponent
} from './pages';
import { NgDatepickerModule } from 'ng2-datepicker';
import { OrderService } from './services/orderService';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TooltipModule } from "ng2-tooltip-directive";
import { searchService } from './services/searchService';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxPaginationModule } from 'ngx-pagination';
import { ClickOutsideModule } from 'ng4-click-outside';
import { LoginService } from './services/loginService';
import { AuthInterceptor } from './services/AuthService';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BarcodeGenerateComponent } from './components/barcode-generate/barcode-generate.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SingleOrderComponent,
    OrderSubHeaderComponent,
    DummyPageComponent,
    OrderComponent,
    OrderListViewComponent,
    activityListViewComponent,
    ActivityComponent,
    OrderDetailedViewComponent,
    OrderNavbarComponent,
    ChatComponent,
    MessagesComponent,
    ChatConsoleComponent,
    FilesComponent,
    SearchComponent,
    BatchOrderComponent,
    OrderProductsComponent,
    MyOrderComponent,
    orderDetailPageComponent,
    CreateOrderPageComponent,
    CreateBarcodeComponent,
    OrderOverviewComponent,
    CreateBatchOrderComponent,
    SubmissionsComponent,
    OrderFeedbackComponent,
    OrderFeedbackPageComponent,
    ActivityOrderViewComponent,
    NotificationsComponent,
    LoginComponent,
    FooterComponent,
    FirstTimeLoginComponent,
    BarcodeGenerateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    HttpModule,
    TagInputModule,
    AngularMultiSelectModule,
    TooltipModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    ClickOutsideModule,
    HttpClientModule,
    NgxBarcodeModule
  ],
  exports: [
    NgDatepickerModule
  ],
  providers: [
    OrderService,
    CurrencyPipe,
    searchService,
    LoginService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
