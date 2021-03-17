import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShowService } from '../../show/services/show.service';
import { catchError, exhaustMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPageable } from './show.selectors';
import { State } from '../reducers/index'
import {
  loadShows,
  loadShowsResult,
  createShow,
  createShowResult,
  deleteShow,
  deleteShowResult
} from './show.actions';

@Injectable({
  providedIn: 'root'
})
export class ShowEffects {

  constructor(private actions$: Actions,
    private router: Router,
    private store: Store<State>,
    private showService: ShowService) {}

  loadShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShows),
      exhaustMap(action => {
        return this.showService.loadShows(action.pageable).pipe(
          map(shows => {
            return loadShowsResult({
              apiError: null,
              success: true,
              shows: shows.content,
            });
          }),
          catchError(error => of(loadShowsResult({
            apiError: error.error,
            success: false,
            shows: null,
          })))
        );
      })
    ));

  createShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShow),
      exhaustMap(action =>
        this.showService.createShow(action.show).pipe(
          map(show => createShowResult({
            success: true,
            apiError: null,
            show,
          })),
          catchError(error => of(createShowResult({
            success: false,
            apiError: error.error,
            show: action.show,
          })))
        ))
    ));

  createShowSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShowResult),
      filter(action => action.success),
      tap(() => {
        this.router.navigate(['/shows']);
      })
    ), { dispatch: false });

  deleteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteShow),
      exhaustMap(action => 
        this.showService.deleteShow(action.show).pipe(
          map(show => deleteShowResult({
            success: true,
            apiError: null,
            show,
          })),
          catchError(error => of(deleteShowResult({
            success: false,
            apiError: error.error,
            show: action.show,
          })))
        ))
    ));

    /**
     * This effect triggers on a successful deleteShowResult action, if successful,
     * we need to dispatch a 'loadShows' action - the show service has deleted an index from
     * it's array but in order for the show list component to keep 5 items at a time, we need
     * to reload the shows and reduce them down into state
     */
    deleteShowResult$ = createEffect(() => 
      this.actions$.pipe(
        ofType(deleteShowResult),
        filter(action => !!action?.success),
        withLatestFrom(this.store.select(selectPageable)),
        switchMap(([, pageable]) => {
          return of(loadShows({pageable}));
        })
      )
    );
}
