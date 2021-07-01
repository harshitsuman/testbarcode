import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
declare var toastr:any

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("access_token");
    // console.log("intercept", idToken)
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          idToken)
      });
      // console.log('Headers Request :  ',req.headers)
      // console.log('Cloned : ',cloned);
      return next.handle(cloned).pipe(
        // map((event: HttpEvent<any>) => {
        //   if (event instanceof HttpResponse) {
        //     console.log('event--->>>', event);
        //   }
        //   return event;
        // })
         catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
          };
          // this.errorDialogService.openDialog(data);
          // console.log("error")
          toastr.error("Your login session has expired")
          this.router.navigate(['login'])
          throw error
          // return error;
        })
      )
    }
    else {
      toastr.error("User Not logged in.Please Login")
      this.router.navigate(['/login'])
      return
      // return next.handle(req);
    }
  }
}