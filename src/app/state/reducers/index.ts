import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { showReducer, ShowState } from '../shows-state/show.reducer';

export interface State {
  shows: ShowState;
}

export const reducers: ActionReducerMap<State> = {
  shows: showReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
