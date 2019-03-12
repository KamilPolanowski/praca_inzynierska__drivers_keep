import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';

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
    BrowserAnimationsModule,
    DKRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [DKComponent]
})
export class DKModule { }
