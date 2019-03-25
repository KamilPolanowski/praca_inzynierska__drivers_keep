import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'drivers-keep-root',
  templateUrl: './drivers-keep.component.html',
  styleUrls: ['./drivers-keep.component.scss']
})
export class DriversKeepComponent implements OnInit, OnDestroy {
  private breakpointObsSub: Subscription;
  constructor(
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObsSub = this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 599px or smaller!');
        }
      });
  }

  ngOnDestroy(): void {
    if (!!this.breakpointObsSub) {
      this.breakpointObsSub.unsubscribe();
    }
  }
}
