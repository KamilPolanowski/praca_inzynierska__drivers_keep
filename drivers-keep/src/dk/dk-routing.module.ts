import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@dk-sys/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    // canActivate: [AuthGuard],
  },
  {
    path: 'glowny-widok',
    loadChildren: './glowny-widok/glowny-widok.module#GlownyWidokModule',
    // canActivate: [AuthGuard]
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
