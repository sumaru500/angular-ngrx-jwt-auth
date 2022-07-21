import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SecureRoutingModule } from './secure-routing.module';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { SecureService } from './services/secure.service';
import { AuthGuard, AuthInterceptor } from '~core/auth';


@NgModule({
  declarations: [
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    SecureService,
    AuthGuard
  ]
})
export class SecureModule { }
