import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from '~core/auth';
import { Store } from '~core/store';

@Component({
  template: `
      <div className="container" *ngIf="(user$ | async) as user">
        <header className="jumbotron">
          <h3>
            <strong>{{user?.username}}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {{user?.accessToken?.substring(0, 20)}} ...{{' '}}
          {{user?.accessToken?.substr((user?.accessToken?.length || 20) - 20)}}
        </p>
        <p>
          <strong>Id:</strong> {{user?.id}}
        </p>
        <p>
          <strong>Email:</strong> {{user?.email}}
        </p>
        <strong>Authorities:</strong>
        <ul *ngIf="user?.roles as roles">
          <li *ngFor="let role of roles">{{role}}</li>
        </ul>
      </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user$? : Observable<AuthUser>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$ = this.store.select("user")
  }

}
