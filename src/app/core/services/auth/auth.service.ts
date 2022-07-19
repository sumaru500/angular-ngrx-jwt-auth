import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as AuthConfig from './auth.config';
import { environment } from '~core/environment';
import { SignIn, AuthUser } from '~model/auth';
import { LocalStorageService, USER_KEY } from '~core/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  public login(username: string, password: string): Observable<AuthUser> {
    const loginUri = `${environment.API_AUTHENTICATION_URL}/${AuthConfig.SIGNIN_URI}`;
    return this.http.post<AuthUser>(loginUri, { username, password }).pipe(
      tap(data => {
        console.log(data);
        this.localStorage.setItem(USER_KEY, JSON.stringify(data))
      })
    );
  }

  public logout() {
    this.localStorage.removeItem(USER_KEY);
  }

  public signup(username: string, password: string, email: string): Observable<unknown> {
    const signupUri = `${environment.API_AUTHENTICATION_URL}/${AuthConfig.SIGNUP_URI}`;
    return this.http.post<unknown>(signupUri, { username, password, email }).pipe(
      tap(data => {
        console.log(data);
      })
    );
  }
}
