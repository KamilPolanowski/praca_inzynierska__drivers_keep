import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drivers-keep-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent implements OnInit {
  public showRouterOutlet: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  public initializeRouterOutlet(userChoseMenu: boolean): void {
    this.showRouterOutlet = userChoseMenu;
  }
}
