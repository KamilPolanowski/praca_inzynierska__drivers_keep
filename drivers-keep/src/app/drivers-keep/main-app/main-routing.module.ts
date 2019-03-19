import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginAuthGuard } from '@drivers-keep-sys/auth-guards/user-logged-guard.service';
import { MainViewComponent } from './main-view/main-view.component';
import { StartDayComponent } from './main-view/start-day/start-day.component';
import { WarehouseGuard } from '@drivers-keep-sys/auth-guards/warehouse-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        component: StartDayComponent
      },
      {
        path: 'admin',
        // canActivateChild: [LoginAuthGuard],
        loadChildren: './main-view/jobs/admin/admin.module#AdminModule'
      },
      {
        path: 'magazyn',
        canActivate: [WarehouseGuard],
        loadChildren: './main-view/jobs/warehouse/warehouse.module#WarehouseModule'
      },
      {
        path: 'pracownik',
        // canActivateChild: [LoginAuthGuard],
        loadChildren: './main-view/jobs/worker/worker.module#WorkerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }
