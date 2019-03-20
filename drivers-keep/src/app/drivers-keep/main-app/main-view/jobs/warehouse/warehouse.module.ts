import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from '@drivers-keep-shared/modules/shared.module';

import { AddNewJobComponent } from './add-new-job/add-new-job.component';
import { JobTemplateComponent } from '../shared-views/job-template/job-template.component';
import { HereGeocodeAutocompleteComponent } from '@drivers-keep-shared/components/here-maps/here-geocode-autocomplete/here-geocode-autocomplete.component';

@NgModule({
  declarations: [
    JobTemplateComponent,
    AddNewJobComponent,
    HereGeocodeAutocompleteComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule
  ]
})
export class WarehouseModule { constructor() { console.log('WarehouseModule'); } }
