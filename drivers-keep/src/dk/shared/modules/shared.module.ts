import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { ContextMenuModule } from 'ngx-contextmenu';

import {
  MatIconModule,
  // MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  // MatDividerModule,
  MatTooltipModule,
  MatDialogModule,
  MatMenuModule,
  MatRippleModule
} from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    // MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    // MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatRippleModule
    // ContextMenuModule
  ]
})
export class SharedModule { constructor() { console.log('SharedModule'); } }
