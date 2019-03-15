import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlownyWidokRoutingModule } from './glowny-widok-routing.module';
import { SharedModule } from '@dk-shared/modules/shared.module';
import { GlownyWidokComponent } from './glowny-widok/glowny-widok.component';
import { OpeningDialogComponent } from './dialogi/opening-dialog/opening-dialog.component';
import { MatToolbarModule, MatTabsModule } from '@angular/material';

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
    MatToolbarModule,
    MatTabsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlownyWidokModule { }
