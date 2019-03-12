import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    // canActivate: [AuthGuard],
  },
  {
    path: 'glowny-widok',
    loadChildren: './glowny-widok/glowny-widok.module#GlownyWidokModule',
  }/* ,
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
