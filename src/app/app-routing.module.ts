import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: 'public/home', pathMatch: 'full'},
 { path: 'account', loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule) },
 { path: 'public', loadChildren: () => import('./features/public/public.module').then(m => m.PublicModule) },
 { path: 'secure', loadChildren: () => import('./features/secure/secure.module').then(m => m.SecureModule) },
 { path: '**', redirectTo: 'public/notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
