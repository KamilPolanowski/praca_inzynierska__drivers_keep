import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlownyWidokRoutingModule } from './glowny-widok-routing.module';
import { GlownyWidokComponent } from './glowny-widok/glowny-widok.component';

@NgModule({
  declarations: [GlownyWidokComponent],
  imports: [
    CommonModule,
    GlownyWidokRoutingModule
  ]
})
export class GlownyWidokModule { }
