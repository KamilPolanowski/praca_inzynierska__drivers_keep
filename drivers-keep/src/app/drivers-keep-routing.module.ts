import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriversKeepComponent } from './drivers-keep/drivers-keep.component';

// import { DriversKeepCustomPreloader } from '@drivers-keep-sys/custom-preloader/drivers-keep-custom-preloader';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'drivers-keep',
    pathMatch: 'full'
  },
  {
    path: 'drivers-keep',
    component: DriversKeepComponent,
    children: [
      {
        path: '',
        loadChildren: './drivers-keep/main-app/main.module#MainModule',
        // data: { preload: true }
      }
    ],
  },
  {
    path: 'authorization',
    loadChildren: './drivers-keep/user-auth/user-auth.module#UserAuthModule',
    // canLoad: [LoginAuthGuard]
  }/* ,
  {
    path: '**',
    component: PageNotFoundComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes/* , { preloadingStrategy: DriversKeepCustomPreloader, scrollPositionRestoration: 'enabled' } */)],
  exports: [RouterModule]
})
export class DriversKeepRoutingModule { }
