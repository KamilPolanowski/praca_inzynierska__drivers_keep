import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    // canActivate: [AuthGuard],
  }/* ,
  {
    path: 'mobile-redirect',
    component: ThisIsMobileAppComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  } */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DKRoutingModule { }
