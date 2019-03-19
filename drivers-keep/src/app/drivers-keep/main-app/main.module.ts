import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatToolbarModule, MatMenuModule, MatRippleModule } from '@angular/material';

import { SharedModule } from '@drivers-keep-shared/modules/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import { DriversKeepTasksComponent } from './main-view/drivers-keep-nav/drivers-keep-nav.component';
import { MenuComponent } from './main-view/drivers-keep-nav/menu/menu.component';
import { StartDayComponent } from './main-view/start-day/start-day.component';

const MATERIAL_MODULE_SCOPED = [
  MatToolbarModule,
  MatMenuModule,
  MatRippleModule
];

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
    MATERIAL_MODULE_SCOPED
  ],
  declarations: [
    MainViewComponent,
    DriversKeepTasksComponent,
    MenuComponent,
    StartDayComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { constructor() { console.log('MainModule'); } }
