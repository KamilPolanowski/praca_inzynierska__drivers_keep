import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DKComponent } from './dk.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DKComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DKComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'drivers-keep'`, () => {
    const fixture = TestBed.createComponent(DKComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('drivers-keep');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(DKComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to drivers-keep!');
  });
});
