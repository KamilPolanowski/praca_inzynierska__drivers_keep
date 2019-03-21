import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContextMenuModule } from 'ngx-contextmenu';

import {
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ContextMenuModule
    // TODO reusable disconnected-absolute here
  ]
})
export class SharedModule { constructor() { console.log('SharedModule'); } }
