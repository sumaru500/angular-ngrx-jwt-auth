import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Store } from '~core/store';
import { SecureService } from '../../services/secure.service';

@Component({
  template: `
      <div className="container">
        <header className="jumbotron">
          <h3>{{userContent$ | async}}</h3>
        </header>
      </div>
      <div *ngIf="isLoading$ | async" class="center">
          <mat-progress-spinner  mode="indeterminate"></mat-progress-spinner>
      </div>
  `,
  styleUrls: ['./board-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardUserComponent implements OnInit {

  public isLoading$ = new BehaviorSubject(false);
  public userContent$?: Observable<string>;
  constructor(private store: Store, private service: SecureService) { }

  ngOnInit(): void {
    this.userContent$ = this.store.select('userContent');

    // init user content
    this.isLoading$.next(true);
    this.service.getUserBoard().pipe(
      finalize(() => this.isLoading$.next(false))
    )
    .subscribe(
      (data) => {
        this.store.update({userContent: data.content})
      }
    )
  }
}
