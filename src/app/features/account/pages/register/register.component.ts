import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '~core/store';
import { AuthService, SignUp } from '~core/auth';

@Component({
  template: `
<div class="container-fluid mt-5">
    <div class="row align-content-center d-flex justify-content-center row">
        <div class="col-4">
            <mat-card>
                <mat-card-title>Register Form</mat-card-title>
                <form #form="ngForm">
                    <mat-card-content>
                        <div class="row">
                            <div class="col-12">
                                <mat-form-field class="w-100">
                                    <input type="text"
                                           matInput
                                           [(ngModel)]="signup.username"
                                           placeholder="username"
                                           required
                                           minlength="4"
                                          name="username"
                                          #username="ngModel"
                                    >
                                    <div *ngIf="username.invalid && (username.dirty || username.touched)"
                                      class="alert alert-danger">

                                      <div *ngIf="username.errors?.['required']">
                                        Username is required.
                                      </div>
                                      <div *ngIf="username.errors?.['minlength']">
                                        Username must be at least 4 characters long.
                                      </div>
                                  </div>
                                </mat-form-field>
                            </div>
                            <div class="col-12">
                                <mat-form-field class="w-100">
                                    <input type="text"
                                           matInput
                                           [(ngModel)]="signup.email"
                                           placeholder="email"
                                           required
                                           name="email">
                                </mat-form-field>
                            </div>
                            <div class="col-12">
                                <mat-form-field class="w-100">
                                    <input type="password"
                                           [(ngModel)]="signup.password"
                                           matInput
                                           required
                                           minlength=6
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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isLoading: boolean = false;
  public signup = {} as SignUp;

  constructor(private authService: AuthService, private router: Router, private store: Store) { }

  ngOnInit(): void {
  }

  public handleSubmit(form: NgForm) {
    console.log(this.signup);
    if (form.valid) {
      this.authService.signup(this.signup.username, this.signup.password, this.signup.email).pipe(
        finalize(() => this.isLoading = false)
      )
        .subscribe(() => this.router.navigate(['account', 'login']));
    }
  }
}
