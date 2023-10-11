import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttaskComponent } from './firsttask.component';

describe('FirsttaskComponent', () => {
  let component: FirsttaskComponent;
  let fixture: ComponentFixture<FirsttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirsttaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
