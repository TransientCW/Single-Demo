import { ApiError } from './api-error.model';

export interface Loadable<T> {
  value: T;
  loaded: boolean;
  loading: boolean;
  error?: ApiError;
}
