import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {SessionService} from "./session.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: SessionService) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("token");

    if (idToken) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError(
        (httpErrorResponse: HttpErrorResponse, _: Observable<HttpEvent<any>>) => {
          if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
            this.authService.logout();
          }
          return throwError(httpErrorResponse);
        }
      )
    );
  }
}
