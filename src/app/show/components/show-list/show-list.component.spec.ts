import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListComponent } from './show-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import * as fromShows from '../../../state/shows-state/show.reducer';
import { ShowsFacade } from 'src/app/state/shows-state/shows.facade';
import { Show } from '../../shared/model/show.model';

describe('ShowComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;
  let store: MockStore;
  let facade: ShowsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ShowListComponent ],
      providers: [
        provideMockStore({
          initialState: {
            shows: fromShows.initialState
          }
        }),
        ShowsFacade
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(ShowsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    component.pageable = { page: 0, size: 5 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteShow() should call facade.dispatchDeleteShow() with a show argument', () => {
    const spy = spyOn(facade, 'dispatchDeleteShow');
    const show = new Show();
    show.artist = 'The Movement';
    component.deleteShow(show);
    expect(spy).toHaveBeenCalledWith(show);
  });

  it('nextPage() should call setPageable() and facade.dispatchLoadShows()', () => {
    const spyPageable = spyOn(component, 'setPageable');
    const spyFacade = spyOn(facade, 'dispatchLoadShows');
    component.nextPage();
    expect(spyPageable).toHaveBeenCalled();
    expect(spyFacade).toHaveBeenCalled();
  });

  it('previousPage() should call setPageable() and facade.dispatchLoadShows()', () => {
    const spyPageable = spyOn(component, 'setPageable');
    const spyFacade = spyOn(facade, 'dispatchLoadShows');
    component.nextPage();
    expect(spyPageable).toHaveBeenCalled();
    expect(spyFacade).toHaveBeenCalled();
  });

  it('setPageable() should set the component pageable object', () => {
    const spy = spyOn(component, 'setPageable').and.callThrough();
    component.setPageable(6);
    expect(component.pageable.page).toEqual(6);
    expect(component.pageable.size).toEqual(5);
  });
});
