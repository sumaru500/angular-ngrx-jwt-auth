import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '~core/environment';
import * as URIs from '../../uri.config';
import { Observable, delay, tap } from 'rxjs';
import { APIContent } from 'src/app/core/services/api';
/**
 * all methods provided in this service not need to be authenticated
 */
@Injectable()
export class SecureService {

  constructor(private http: HttpClient) { }

  getUserBoard() : Observable<APIContent> {
    const getUserContentUrl = `${environment.API_URL}/${URIs.USER_URI}`
    return this.http.get<APIContent>(getUserContentUrl).pipe(
      delay(1000),
      tap (data => console.log(data))
    );
  }
  getModeratorBoard() {
    const getModeratorContentUrl = `${environment.API_URL}/${URIs.MODERATOR_URI}`
    return this.http.get<APIContent>(getModeratorContentUrl).pipe(
      delay(1000),
      tap (data => console.log(data))
    );
  }
  getAdminBoard() {
    const getAdminContentUrl = `${environment.API_URL}/${URIs.ADMIN_URI}`
    return this.http.get<APIContent>(getAdminContentUrl).pipe(
      delay(1000),
      tap (data => console.log(data))
    );
  }
}
