import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from '@drivers-keep-shared/modules/shared.module';

import { AddNewJobComponent } from './add-new-job/add-new-job.component';
import { JobTemplateComponent } from '../shared-views/job-template/job-template.component';
import { HereGeocodeAutocompleteComponent } from '@drivers-keep-shared/components/here-maps/here-geocode-autocomplete/here-geocode-autocomplete.component';
import { ViewAllJobsComponent } from '../shared-views/view-all-jobs/view-all-jobs.component';
import { EditJobComponent } from '../shared-views/edit-job/edit-job.component';

const MATERIAL_MODULE_SCOPED = [
  MatCheckboxModule
];


@NgModule({
  declarations: [
    JobTemplateComponent,
    AddNewJobComponent,
    HereGeocodeAutocompleteComponent,
    ViewAllJobsComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
    MATERIAL_MODULE_SCOPED,
    VirtualScrollerModule
  ]
})
export class WarehouseModule { constructor() { console.log('WarehouseModule'); } }
