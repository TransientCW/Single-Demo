import * as fromShows from './show.reducer';
import { ShowState } from './show.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';

export const selectShowState = createFeatureSelector<fromRoot.State, ShowState>('shows');

/**
 * Selector for the pageable ShowState property
 */
export const selectPageable = createSelector(
  fromShows.getShowState,
  state => state.pageable
);

export const selectShowLoadable = createSelector(
  selectShowState,
  fromShows.getShows,
);

export const selectLoadingShows = createSelector(
  selectShowLoadable,
  state => state.loading,
);

export const selectShowsLoaded = createSelector(
  selectShowLoadable,
  state => state.loaded,
);

export const selectShows = createSelector(
  selectShowLoadable,
  state => state.value,
);

export const selectAllShows = createSelector(
  selectShows,
  fromShows.selectAll,
);

export const selectShowTotal = createSelector(
  selectShows,
  fromShows.selectTotal,
);

export const selectFilteredShows = createSelector(
  selectShowState,
  state => {
    if (!state.filter || state.filter === '') {
      return fromShows.selectAll(state.shows.value);
    }
    return fromShows.selectAll(state.shows.value)
      .filter(show => {
        return show.venue?.toLowerCase()?.includes(state.filter.toLowerCase()) ||
          show.artist?.toLowerCase().includes(state.filter.toLowerCase());
      });
  },
)
