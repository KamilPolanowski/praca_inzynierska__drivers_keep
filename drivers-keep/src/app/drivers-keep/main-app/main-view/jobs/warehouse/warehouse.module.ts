import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';

@NgModule({
  declarations: [AddNewJobComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { constructor() { console.log('WarehouseModule'); } }
