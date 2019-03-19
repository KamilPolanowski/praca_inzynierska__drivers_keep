import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversKeepTasksComponent } from './drivers-keep-nav.component';

describe('DriversKeepTasksComponent', () => {
  let component: DriversKeepTasksComponent;
  let fixture: ComponentFixture<DriversKeepTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversKeepTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversKeepTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
