import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '~core/environment';
import * as URIs from '../../uri.config';
import { delay, Observable, tap } from 'rxjs';
import { APIContent } from '~core/api';
/**
 * all methods provided in this service not need to be authenticated
 */
@Injectable()
export class PublicService {

  constructor(private http: HttpClient) { }

  public getPublicContent() : Observable<APIContent> {
    const getPublicContentUrl = `${environment.API_URL}/${URIs.ALL_URI}`
    return this.http.get<APIContent>(getPublicContentUrl).pipe(
      delay(1000),
      tap (data => console.log(data))
    );
  }
}
