import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Show } from '../../shared/model/show.model';
import { Pageable } from '../../../shared/models/pageable.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ShowsFacade } from 'src/app/state/shows-state/shows.facade';

@Component({
  selector: 'single-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  shows$: Observable<Show[]>;

  shows: Show[];

  pageable: Pageable;

  showFilter = '';
  showFilterInput = new FormControl();

  constructor(private showsFacade: ShowsFacade) {}

  ngOnInit(): void {
    this.pageable = {
      page: 0,
      size: 5
    };
    this.loading$ = this.showsFacade.loading$;
    this.loaded$ = this.showsFacade.loaded$;
    this.shows$ = this.showsFacade.shows$;

    this.showFilterInput.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(value => {
        this.showsFacade.dispatchFilterShows(value);
      })
    ).subscribe();
    this.showsFacade.dispatchLoadShows(this.pageable || { page: 0, size: 5});
  }

  deleteShow(show: Show) {
    // this.showsFacade.dispatchSetPageable({ page: 0, size: 5});
    this.showsFacade.dispatchDeleteShow(show);
  }

  nextPage(): void {
    this.setPageable(this.pageable.page + 1);
    this.showsFacade.dispatchLoadShows(this.pageable);
  }

  previousPage(): void {
    const page = this.pageable.page === 0 ? 0 : this.pageable.page - 1;
    this.setPageable(page);
    this.showsFacade.dispatchLoadShows(this.pageable);
  }

  setPageable(page: number): void {
    this.pageable = {
      ...this.pageable,
      page
    };
  }

}
