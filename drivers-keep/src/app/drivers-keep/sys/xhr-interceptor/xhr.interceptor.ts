import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ServerSettings } from '../settings/server-settings';

@Injectable()
export class XHRInterceptor implements HttpInterceptor {
  constructor(private serverSettings: ServerSettings) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userJWT: string = localStorage.getItem('authToken');
    if (!!userJWT) {
      const url: string = this.serverSettings.mockUrl; // TODO enum rather then service
      request = request.clone({
        url: url + request.url,
        setHeaders: {
          'auth-type': 'JWT',
          'auth-jwt': userJWT,
          'current-database': localStorage.getItem('currentDBInstance')
        }
      });
      return next.handle(request).pipe(
        retry(1),
        catchError((err: HttpErrorResponse) => {
          /* if (err.status === 401) {
            // 401 z okazji błędnego uwierzytelniania JWT
            console.error('401', err);
          }
          // const error = err.error.message || err.statusText;
          // return throwError(error); */
          return throwError(err);
        }));
    } else {
      return throwError('Missing authToken');
    }
  }
}
