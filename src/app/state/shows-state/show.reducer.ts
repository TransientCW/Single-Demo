import { Show } from '../../show/shared/model/show.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loadable } from '../../shared/models/loadable.model';
import { createReducer, on } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Pageable } from 'src/app/shared/models/pageable.model';
import { State } from 'src/app/state/reducers';
import {
  loadShows,
  loadShowsResult,
  createShow,
  createShowResult,
  deleteShow,
  deleteShowResult,
  filterShows,
  setPageable
} from './show.actions';

export interface ShowEntityState extends EntityState<Show> {
}

export interface ShowState {
  shows: Loadable<ShowEntityState>;
  creating: boolean;
  deleting: boolean;
  creationError: ApiError;
  deletionError: ApiError;
  filter: string;
  pageable: Pageable;
}

export const showAdapter: EntityAdapter<Show> = createEntityAdapter<Show>({
  selectId: (show) => show.id,
  sortComparer: (a, b) => b.eventTime.getUTCMilliseconds() - a.eventTime.getUTCMilliseconds(),
});

export const initialState: ShowState = {
  shows: {
    loading: false,
    loaded: false,
    value: showAdapter.getInitialState(),
    error: null
  },
  creating: false,
  deleting: false,
  creationError: null,
  deletionError: null,
  filter: null,
  pageable: {
    page: 0,
    size: 5
  }
};

export const showReducer = createReducer(initialState,
  on(loadShows, state => {
    return {
      ...state,
      shows: {
        ...state.shows,
        loading: true,
        loaded: false,
        error: null,
      },
    };
  }),
  on(loadShowsResult, (state, action) => {
    if (action.success) {
      return {
        ...state,
        shows: {
          loading: false,
          loaded: true,
          error: null,
          value: showAdapter.setAll(
            action.shows,
            state.shows.value,
          ),
        }
      };
    }
    return {
      ...state,
      shows: {
        ...state.shows,
        loading: false,
        loaded: false,
        error: action.apiError,
      }
    };
  }),
  on(createShow, state => {
    return {
      ...state,
      creating: true,
      creationError: null,
    };
  }),
  on(createShowResult, (state, action) => {
    if (action.success) {
      return {
        ...state,
        creating: false,
        shows: {
          ...state.shows,
          value: showAdapter.addOne(action.show, state.shows.value),
        }
      };
    }
    return {
      ...state,
      creating: false,
      creationError: action.apiError
    };
  }),
  on(deleteShow, state => {
    return {
      ...state,
      deleting: true,
      deletionError: null,
    };
  }),
  on(deleteShowResult, (state, action) => {
    if (action.success) {
      return {
        ...state,
        deleting: false,
        shows: {
          ...state.shows,
          value: showAdapter.removeOne(action.show.id, state.shows.value),
        }
      };
    }
    return {
      ...state,
      deleting: false,
      deletionError: action.apiError,
    };
  }),
  on(filterShows, (state, action) => {
    return {
      ...state,
      filter: action.query,
    };
  }),
  on(setPageable, (state, action) => {
    return {
      ...state,
      pageable: action.pageable
    }
  })
);

export const { selectAll, selectTotal } = showAdapter.getSelectors();
export const getShows = (state: ShowState) => state.shows;
export const getFilter = (state: ShowState) => state.filter;
export const getShowState = (state: State) => state.shows;