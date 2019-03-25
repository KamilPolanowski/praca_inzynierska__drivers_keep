import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';
import { ViewAllJobsComponent } from '../shared-views/view-all-jobs/view-all-jobs.component';
import { EditJobComponent } from '../shared-views/edit-job/edit-job.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dodaj-zlecenie',
    pathMatch: 'full'
  },
  {
    path: 'dodaj-zlecenie',
    component: AddNewJobComponent
  },
  {
    path: 'przeglad-zlecen',
    component: ViewAllJobsComponent
  },
  {
    path: 'zlecenie/:jid',
    component: EditJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
