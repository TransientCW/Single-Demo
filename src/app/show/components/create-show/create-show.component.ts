import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Show } from '../../shared/model/show.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UrlValidationPipe } from 'src/app/shared/pipes/url-validation.pipe';
import { Router } from '@angular/router';
import { ShowsFacade } from 'src/app/state/shows-state/shows.facade';

@Component({
  selector: 'single-create-show',
  templateUrl: './create-show.component.html',
  styleUrls: ['./create-show.component.scss']
})
export class CreateShowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('f') form: NgForm;
  show: Show;
  eventTime: NgbDateStruct;
  showComplete = false;
  formSub: Subscription;

  constructor(
    private showsFacade: ShowsFacade,
    private urlPipe: UrlValidationPipe,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.show = new Show();
  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.formSub = this.form?.valueChanges?.pipe(
      tap((vals: Partial<Show>) => {
        this.showComplete = 
          !!this.urlPipe.transform(vals?.ticketUrl) &&
          !!vals?.artist &&
          !!vals?.eventTime &&
          !!vals?.venue;
      })
    ).subscribe();
  }

  createShow(): void {
    if (this.showComplete && this.eventTime) {
      this.show.eventTime = new Date(
        this.eventTime.year,
        this.eventTime.month - 1,
        this.eventTime.day
        );
        this.showsFacade.dispatchCreateShow(this.show);
    }
    // this.store.dispatch(createShow({ show: this.show }));
  }

  onBackNav(): void {
    this.router.navigate(['/']);
  }

}
