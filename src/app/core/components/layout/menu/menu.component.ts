import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthUser } from '~core/auth';

@Component({
  selector: 'app-menu',
  template: `
    <mat-toolbar color="primary">
      <!-- <mat-toolbar-row> -->
        <!-- The following menu items will be hidden on both SM and XS screen sizes -->

          <a class="gap" routerLink="/public/home" routerLinkActive="nav-active">
            <mat-icon>home</mat-icon>
            <ng-container>Home</ng-container>
          </a>
          <a *ngIf="user?.accessToken && user?.roles?.includes('ROLE_MODERATOR')" routerLink="/secure/mod" routerLinkActive="nav-active">
            <mat-icon>supervisor_account</mat-icon>
            <ng-container>Moderator</ng-container>
          </a>
          <a *ngIf="user?.accessToken && user?.roles?.includes('ROLE_ADMIN')" routerLink="/secure/admin" routerLinkActive="nav-active">
            <mat-icon>dashboard</mat-icon>
            <ng-container>Admin</ng-container>
          </a>
          <a *ngIf="user?.accessToken" routerLink="/secure/user" routerLinkActive="nav-active">
            <mat-icon [matBadge]="1" matBadgePosition="above before" matBadgeColor="accent" matBadgeSize="small">person</mat-icon>
            <ng-container>User</ng-container>
          </a>

          <span class = "filler"></span>
          
          <a *ngIf="user?.accessToken" routerLink="/account/profile" routerLinkActive="nav-active">
            <mat-icon [matBadge]="1" matBadgePosition="above before" matBadgeColor="accent" matBadgeSize="small">person_pin</mat-icon>
            <ng-container>{{user?.username}}</ng-container>
          </a>
          <a *ngIf="user?.accessToken" routerLink="/public/home" routerLinkActive="nav-active"  (click)="handleLogout($event)">
          <span class="material-symbols-outlined">logout</span>
            <!-- <mat-icon [matBadge]="1" matBadgePosition="above before" matBadgeColor="accent" matBadgeSize="small">logout</mat-icon> -->
            <ng-container>Logout</ng-container>
          </a>
          <!-- not yet authenticated -->
          <a *ngIf="!user?.accessToken" routerLink="/account/login" routerLinkActive="nav-active">
          <span class="material-symbols-outlined">login</span>
            <!-- <mat-icon>login</mat-icon> -->
            <ng-container>Login</ng-container>
          </a>
          <a *ngIf="!user?.accessToken" routerLink="/account/register" routerLinkActive="nav-active">
            <mat-icon>account_circle</mat-icon>
            <ng-container>Register</ng-container>
          </a>


      <!-- </mat-toolbar-row> -->
    </mat-toolbar>
  `,
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() user?: AuthUser;
  @Output() onLogout = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public handleLogout(event: MouseEvent) {
    this.onLogout.emit(event);
  }

}
