import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { showAdapter, ShowState } from "../show.reducer";
import { ShowsFacade } from "../shows.facade";
import { State } from "../../reducers/index";
import { Store } from "@ngrx/store";
import { createShow, deleteShow, filterShows, loadShows, setPageable } from "../show.actions";
import { Show } from "src/app/show/shared/model/show.model";
import { hot } from 'jasmine-marbles';


fdescribe('Facade: Shows', () => {
  let facade: ShowsFacade;
  let store: MockStore<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
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
          }
        }),
        ShowsFacade
      ]
    });
  });

  describe('Dispatcher functions', () => {

    describe('dispatchCreateShow', () => {
      it('should dispatch createShow action', () => {
        facade = TestBed.inject(ShowsFacade);
        store = TestBed.inject(Store) as MockStore<State>;
        const spy = spyOn(store, 'dispatch');
        facade.dispatchCreateShow(null);
        expect(spy).toHaveBeenCalledWith(createShow({ show: null }));
      });
    });

    describe('dispatchFilterShows', () => {
      it('should dispatch filterShows action', () => {
        facade = TestBed.inject(ShowsFacade);
        store = TestBed.inject(Store) as MockStore<State>;
        const spy = spyOn(store, 'dispatch');
        facade.dispatchFilterShows('some query');
        expect(spy).toHaveBeenCalledWith(filterShows({ query: 'some query' }));
      });
    });

    describe('dispatchLoadShows', () => {
        it('should dispatch loadShows action', () => {
          facade = TestBed.inject(ShowsFacade);
          store = TestBed.inject(Store) as MockStore<State>;
          const spy = spyOn(store, 'dispatch');
          facade.dispatchLoadShows({ page: 0, size: 5});
          expect(spy).toHaveBeenCalledWith(loadShows({ pageable: { page: 0, size: 5} }));
        });
    });

    describe('dispatchDeleteShow', () => {
      it('should dispatch deleteShow action', () => {
        facade = TestBed.inject(ShowsFacade);
        store = TestBed.inject(Store) as MockStore<State>;
        const spy = spyOn(store, 'dispatch');
        const show = new Show();
        show.artist = 'Rebelution';
        facade.dispatchDeleteShow(show);
        expect(spy).toHaveBeenCalledWith(deleteShow({ show }));
      });
    });

    describe('dispatchSetPageable', () => {
      it('should dispatch setPageable action', () => {
        facade = TestBed.inject(ShowsFacade);
        store = TestBed.inject(Store) as MockStore<State>;
        const spy = spyOn(store, 'dispatch');
        facade.dispatchSetPageable({ page: 0, size: 25 });
        expect(spy).toHaveBeenCalledWith(setPageable({ pageable: { page: 0, size: 25 }}));
      });
    });
  });

  describe('Selector functions', () => {
    beforeEach(() => {
      facade = TestBed.inject(ShowsFacade);
      store = TestBed.inject(Store) as MockStore<State>;
      store.setState({
        shows: {
          shows: {
            loading: true,
            loaded: true,
            value: showAdapter.getInitialState(),
          },
          creating: false,
          deleting: false,
          creationError: null,
          deletionError: null,
          filter: 'def',
          pageable: {
            page: 0,
            size: 100
          } 
        }         
      });
    });

    describe('loading$ getter', () => {
      it('should return true after setting loaded to true in ShowState in beforeEach', () => {
        const expected = hot('a', { a: true });
        expect(facade.loading$).toBeObservable(expected);
      });
    });

    describe('loaded$ getter', () => {
      it('should return true after setting loading to true in ShowState in beforeEach', () => {
        const expected = hot('a', { a: true });
        expect(facade.loading$).toBeObservable(expected);
      });
    });

    describe('shows$ getter', () => {
      it('should return shows empty array since initial entity shows is []', () => {
        const expected = hot('a', { a: [] });
        expect(facade.shows$).toBeObservable(expected);
      });
    });

    describe('pageable$ getter', () => {
      it('should return pageable that was set in beforeEach', () => {
        const expected = hot('a', { a: { page: 0, size: 100 } });
        expect(facade.pageable$).toBeObservable(expected);
      });
    });
  });
});