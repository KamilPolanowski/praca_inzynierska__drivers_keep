import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { DKRoutingModule } from './dk-routing.module';
import { DKComponent } from './dk.component';

const firebaseConfig = {
  apiKey: 'AIzaSyA_mP1AuZwmBJ5aJvYbuQHqs6rFgdj8iVs',
  authDomain: 'drivers-keep.firebaseapp.com',
  databaseURL: 'https://drivers-keep.firebaseio.com',
  projectId: 'drivers-keep',
  storageBucket: 'drivers-keep.appspot.com',
  messagingSenderId: '2346174526'
};

@NgModule({
  declarations: [
    DKComponent
  ],
  imports: [
    BrowserModule,
    DKRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [DKComponent]
})
export class DKModule { }
