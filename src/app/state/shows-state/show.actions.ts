import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { Pageable } from 'src/app/shared/models/pageable.model';
import { Show } from 'src/app/show/shared/model/show.model';

export const loadShows = createAction(
  '[Show] Load Shows', props<{ pageable: Pageable }>());

export const loadShowsResult = createAction(
  '[Show] Load Shows Result',
  props<{
    shows: Show[];
    success: boolean;
    apiError: ApiError;
  }>(),
);

export const createShow = createAction(
  '[Show] Create Show',
  props<{ show: Show; }>()
);

export const createShowResult = createAction(
  '[Show] Create Show Result',
  props<{
    show: Show;
    success: boolean;
    apiError: ApiError;
  }>()
);

export const deleteShow = createAction(
  '[Show] Delete Show',
  props<{ show: Show; }>());

export const deleteShowResult = createAction(
  '[Show] Delete Show Result',
  props<{
    show: Show;
    success: boolean;
    apiError: ApiError;
  }>()
);

export const filterShows = createAction(
  '[Show] Filter Shows',
  props<{ query: string }>()
);

export const setPageable = createAction(
  '[Show] Set Pageable Values',
  props<{ pageable: Pageable }>()
);
