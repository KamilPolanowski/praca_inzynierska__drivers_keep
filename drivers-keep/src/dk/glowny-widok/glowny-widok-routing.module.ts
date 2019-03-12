import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlownyWidokComponent } from './glowny-widok/glowny-widok.component';

const routes: Routes = [
  {
    path: '',
    component: GlownyWidokComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlownyWidokRoutingModule { }
