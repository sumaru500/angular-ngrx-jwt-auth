import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Store } from '~core/store';
import { PublicService } from '../../services/public.service';

@Component({
  template: `
      <div className="container">
        <header className="jumbotron">
          <h3>{{homeContent$ | async}}</h3>
        </header>
      </div>
      <div *ngIf="isLoading$ | async" class="center">
          <mat-progress-spinner  mode="indeterminate"></mat-progress-spinner>
      </div>
  `,
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public isLoading$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public homeContent$?: Observable<string>;
  constructor(private store: Store, private service: PublicService) { }

  ngOnInit(): void {
    this.homeContent$ = this.store.select('homeContent');

    // init home content
    this.isLoading$.next(true);
    this.service.getPublicContent().pipe(
      finalize(() => this.isLoading$.next(false))
    )
    .subscribe(
      (data) => {
        this.store.update({homeContent: data.content});
      }
    )
  }
}
