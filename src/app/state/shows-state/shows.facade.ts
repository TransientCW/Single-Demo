import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Show } from "src/app/show/shared/model/show.model";
import { createShow, deleteShow, filterShows, loadShows, setPageable } from "./show.actions";
import { State } from "../reducers/index";
import { selectFilteredShows, selectLoadingShows, selectPageable, selectShowsLoaded } from "./show.selectors";
import { Pageable } from "src/app/shared/models/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class ShowsFacade {
  constructor(private store: Store<State>) {}

  // Dispatchers
  dispatchCreateShow(show: Show): void {
    this.store.dispatch(createShow({ show }));
  }

  dispatchFilterShows(query: string): void {
    this.store.dispatch(filterShows({ query }));
  }

  dispatchLoadShows(pageable: Pageable): void {
    this.store.dispatch(loadShows({ pageable }));
  }

  dispatchDeleteShow(show: Show): void {
    this.store.dispatch(deleteShow({ show }));
  }

  dispatchSetPageable(pageable: Pageable): void {
    this.store.dispatch(setPageable({ pageable }));
  }

  // Selector mapped observables
  get loading$(): Observable<boolean> {
    return this.store.pipe(select(selectLoadingShows));
  }

  get loaded$(): Observable<boolean> {
    return this.store.pipe(select(selectShowsLoaded));
  }

  get shows$(): Observable<Show[]> {
    return this.store.pipe(select(selectFilteredShows));
  }

  get pageable$(): Observable<Pageable> {
    return this.store.pipe(select(selectPageable));
  }
}