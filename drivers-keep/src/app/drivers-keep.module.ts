import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContextMenuModule } from 'ngx-contextmenu';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { DynamicComponentsModule } from '@drivers-keep-shared/dynamic-dialog/dynamic-components.module';

import { DriversKeepRoutingModule } from './drivers-keep-routing.module';
import { DriversKeepComponent } from './drivers-keep/drivers-keep.component';

import { XHRInterceptor } from '@drivers-keep-sys/xhr-interceptor/xhr.interceptor';
import { GlobalErrorHandler } from '@drivers-keep-sys/errors/global-error-handler.service';

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
    DriversKeepComponent
  ],
  imports: [
    BrowserModule,
    DriversKeepRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DynamicComponentsModule,
    ContextMenuModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XHRInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [DriversKeepComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DriversKeepModule { }
