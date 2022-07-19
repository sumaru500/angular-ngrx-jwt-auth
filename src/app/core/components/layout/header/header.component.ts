import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthUser } from '~core/auth';

@Component({
  selector: 'app-header',
  template: `
    <header id="header">
      <div id="logo">
      <a routerLink="/" routerLinkActive="nav-active">
        <img src="assets/logo.svg" alt="Cinemapp" width="60" height="60">
      </a>
      </div>
      <!-- <div id="logo">
        <a routerLink="/" routerLinkActive="nav-active">
          <span>JWT-AUTH</span>
        </a>
      </div> -->
      <app-menu [user]="user" (onLogout)="handleLogout($event)"></app-menu>
    </header>
  `,
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() user?: AuthUser;
  @Output() onLogout = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public handleLogout(event: MouseEvent) {
    this.onLogout.emit(event);
  }

}
