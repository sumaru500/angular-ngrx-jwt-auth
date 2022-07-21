import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '~core/store';
import { AuthUser } from '~model/auth';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header [user]="(user$ | async) || {}" (onLogout)="handleLogout($event)"></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public user$? : Observable<AuthUser>;

  constructor(private store: Store, private authService: AuthService) {
  }

  ngOnInit(): void {
    // init observable for AuthUser
    this.user$ = this.store.select("user"); // see in state model
    console.log("App OnInit");
  }

  public handleLogout(event: MouseEvent) {
    this.store.update({user: {}});
    this.authService.logout();
  }
}

