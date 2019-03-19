import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dodaj-zlecenie',
    pathMatch: 'full'
  },
  {
    path: 'dodaj-zlecenie',
    component: AddNewJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
