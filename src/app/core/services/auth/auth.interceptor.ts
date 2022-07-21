import {Inject, Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { environment } from '~core/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser = this.authService.getAuthUser();
    let authReq : HttpRequest<any> = req;
    if (authUser && authUser.accessToken) {
      if (environment.backend === 'spring') {
        // SpringBoot 'spring'
        authReq = req.clone({
          setHeaders: {Authorization: 'Bearer ' + authUser.accessToken}
        });
      }
      else {
        // Nodejs express 'node'
        authReq = req.clone({
          setHeaders: {"x-access-token": authUser.accessToken}
        });
      }

      console.log("Request before add jwt", [req])
      console.log("Request after add jwt", [authReq])
    }

    return next.handle(authReq).pipe(
      tap(() => {}, error => {
        // error handler instead of create another intercepter
        if ((error instanceof HttpErrorResponse) && ((error.status === 401) || (error.status === 403))) {
          // logout systematically
          this.authService.logout();
          console.log("error when request");
        }
      })
    );
  }

}
