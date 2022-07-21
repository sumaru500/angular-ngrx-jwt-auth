import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '~core/store';
import { AuthService, SignIn } from '~core/auth';

@Component({
  template: `
<div class="container-fluid mt-5">
    <div class="row align-content-center d-flex justify-content-center row">
        <div class="col-4">
            <mat-card>
                <mat-card-title>Login Form</mat-card-title>
                <form #form="ngForm">
                    <mat-card-content>
                        <div class="row">
                            <div class="col-12">
                                <mat-form-field class="w-100">
                                    <input type="text"
                                           matInput
                                           [(ngModel)]="signin.username"
                                           placeholder="username"
                                           required
                                           name="username">
                                </mat-form-field>
                            </div>
                            <div class="col-12">
                                <mat-form-field class="w-100">
                                    <input type="password"
                                           [(ngModel)]="signin.password"
                                           matInput
                                           required
                                           placeholder="password"
                                           name="password">
                                </mat-form-field>
                            </div>
                        </div>
                    </mat-card-content>
                    <mat-card-actions class="d-flex justify-content-center">
                        <button mat-flat-button
                                color="primary"
                                [disabled]="isLoading"
                                (click)="handleSubmit(form)"
                                class="w-100">Submit</button>
                    </mat-card-actions>
                </form>
                <mat-progress-bar *ngIf="isLoading" mode="indeterminate"></mat-progress-bar>
            </mat-card>
        </div>
    </div>
</div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;
  public signin = {} as SignIn;

  private returnUrl: string = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private store : Store) {
    // if already logged => redirect to root
    if (this.authService.getAuthUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  public handleSubmit(form: NgForm) {
    console.log(this.signin);
    if (form.valid) {
      this.authService.login(this.signin.username, this.signin.password).pipe(
        finalize(() => this.isLoading = false),
        tap(data => this.store.update({user: data}))
      )
      .subscribe(() => {
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl])
        }
        else {
          this.router.navigate(['account', 'profile'])
        }
      });
    }
  }

}
