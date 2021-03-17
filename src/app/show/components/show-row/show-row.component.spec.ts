import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { Show } from '../../shared/model/show.model';
import { ShowRowComponent } from './show-row.component';

describe('ShowRowComponent', () => {
  let component: ShowRowComponent;
  let fixture: ComponentFixture<ShowRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShowRowComponent,
        MockComponent(
          {
            selector: 'single-show-row',
            inputs: ['show'],
            outputs: ['deleteShowEmitter']
          }
          )
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRowComponent);
    component = fixture.componentInstance;
    const show = new Show();
    show.artist = 'test';
    show.venue = 'test';
    show.ticketUrl = 'url';
    show.eventTime = null;
    component.show = show;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
