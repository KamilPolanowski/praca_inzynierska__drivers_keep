import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';

import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogDirective } from './dynamic-dialog.directive';

const MATERIAL_MODULES = [
  MatDialogModule
];

const DYNAMIC_COMPONENTS = [

];
/*
 * Seperate module handling Dynamic Dialogs and Components.
 * Any new Dynamic Component should be entry component here
 * (declared in module of choosing, not here).
 */
@NgModule({
  declarations: [
    DynamicDialogComponent,
    DynamicDialogDirective
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES
  ],
  exports: [
    MATERIAL_MODULES // TODO: prob out with this
  ],
  entryComponents: [
    DynamicDialogComponent,
    DYNAMIC_COMPONENTS
  ]
})
export class DynamicComponentsModule {
  constructor() { }
}
