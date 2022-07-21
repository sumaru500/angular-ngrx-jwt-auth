import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Store } from '~core/store';
import { SecureService } from '../../services/secure.service';

@Component({
  template: `
      <div className="container">
        <header className="jumbotron">
          <h3>{{adminContent$ | async}}</h3>
        </header>
      </div>
      <div *ngIf="isLoading$ | async" class="center">
          <mat-progress-spinner  mode="indeterminate"></mat-progress-spinner>
      </div>
  `,
  styleUrls: ['./board-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardAdminComponent implements OnInit {

  public isLoading$ = new BehaviorSubject(false);
  public adminContent$?: Observable<string>;
  constructor(private store: Store, private service: SecureService) { }

  ngOnInit(): void {
    this.adminContent$ = this.store.select('adminContent');

    // init user content
    this.isLoading$.next(true);
    this.service.getAdminBoard().pipe(
      finalize(() => this.isLoading$.next(false))
    )
    .subscribe(
      (data) => {
        this.store.update({adminContent: data.content})
      }
    )
  }
}

