import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRowComponent } from './show-row.component';

describe('ShowRowComponent', () => {
  let component: ShowRowComponent;
  let fixture: ComponentFixture<ShowRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
