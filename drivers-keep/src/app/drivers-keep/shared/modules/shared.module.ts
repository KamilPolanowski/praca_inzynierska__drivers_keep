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
  MatDividerModule,
  MatTooltipModule,
  MatAutocompleteModule
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
    MatProgressSpinnerModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ContextMenuModule
    // TODO reusable disconnected-absolute here
  ]
})
export class SharedModule { constructor() { console.log('SharedModule'); } }
