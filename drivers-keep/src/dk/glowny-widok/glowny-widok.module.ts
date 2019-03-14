import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { GlownyWidokRoutingModule } from './glowny-widok-routing.module';
import { SharedModule } from '@dk-shared/modules/shared.module';
import { GlownyWidokComponent } from './glowny-widok/glowny-widok.component';
import { OpeningDialogComponent } from './dialogi/opening-dialog/opening-dialog.component';

@NgModule({
  declarations: [
    GlownyWidokComponent,
    OpeningDialogComponent
  ],
  entryComponents: [OpeningDialogComponent],
  imports: [
    CommonModule,
    GlownyWidokRoutingModule,
    SharedModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlownyWidokModule { }
