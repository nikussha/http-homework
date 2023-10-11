import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondtaskComponent } from './secondtask.component';

describe('SecondtaskComponent', () => {
  let component: SecondtaskComponent;
  let fixture: ComponentFixture<SecondtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
