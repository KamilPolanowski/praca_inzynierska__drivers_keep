import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlownyWidokComponent } from './glowny-widok.component';

describe('GlownyWidokComponent', () => {
  let component: GlownyWidokComponent;
  let fixture: ComponentFixture<GlownyWidokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlownyWidokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlownyWidokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
