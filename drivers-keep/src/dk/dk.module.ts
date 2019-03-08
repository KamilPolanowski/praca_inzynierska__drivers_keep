import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DKRoutingModule } from './dk-routing.module';
import { DKComponent } from './dk.component';

@NgModule({
  declarations: [
    DKComponent
  ],
  imports: [
    BrowserModule,
    DKRoutingModule
  ],
  providers: [],
  bootstrap: [DKComponent]
})
export class DKModule { }
