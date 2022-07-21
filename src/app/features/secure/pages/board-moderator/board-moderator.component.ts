import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Store } from '~core/store';
import { SecureService } from '../../services/secure.service';

@Component({
  template: `
      <div className="container">
        <header className="jumbotron">
          <h3>{{moderatorContent$ | async}}</h3>
        </header>
      </div>
      <div *ngIf="isLoading$ | async" class="center">
          <mat-progress-spinner  mode="indeterminate"></mat-progress-spinner>
      </div>
  `,
  styleUrls: ['./board-moderator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardModeratorComponent implements OnInit {

  public isLoading$ = new BehaviorSubject(false);
  public moderatorContent$?: Observable<string>;
  constructor(private store: Store, private service: SecureService) { }

  ngOnInit(): void {
    this.moderatorContent$ = this.store.select('modContent');

    // init user content
    this.isLoading$.next(true);
    this.service.getModeratorBoard().pipe(
      finalize(() => this.isLoading$.next(false))
    )
    .subscribe(
      (data) => {
        this.store.update({modContent: data.content})
      }
    )
  }
}
