import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '~core/auth';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import {Role} from '~model';

const routes: Routes = [
  { path: 'admin',
    component: BoardAdminComponent,
    canActivate: [AuthGuard],
    data: { role: Role.Admin,
            homeUrl: ['public', 'home'],
            loginUrl : ['account', 'login']
          }
  },
  { path: 'mod',
    component: BoardModeratorComponent,
    canActivate: [AuthGuard],
    data: { role: Role.Moderator,
            homeUrl: ['public', 'home'],
            loginUrl : ['account', 'login']
          }
  },
  { path: 'user',
    component: BoardUserComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User,
            homeUrl: ['public', 'home'],
            loginUrl : ['account', 'login']
          }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
