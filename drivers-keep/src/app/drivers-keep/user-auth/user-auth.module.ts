import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SharedModule } from '@drivers-keep-shared/modules/shared.module';

@NgModule({
  declarations: [
    UserAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserAuthRoutingModule,
    SharedModule
  ]
})
export class UserAuthModule {
  constructor() { console.log('LoginModule'); }
}
