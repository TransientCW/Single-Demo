import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowComponent } from './create-show.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromShows from '../../../state/shows-state/show.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateShowComponent', () => {
  let component: CreateShowComponent;
  let fixture: ComponentFixture<CreateShowComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgbDatepickerModule,
      ],
      declarations: [ CreateShowComponent ],
      providers: [
        provideMockStore({
          initialState: {
            shows: fromShows.initialState
          }
        }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
