import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserInfoForRegister } from '@drivers-keep-shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {
  private userInfoForRegistering: UserInfoForRegister;

  constructor(private fireDatabase: AngularFireDatabase) { }

  write(whereTo: string, what: object, onComplete?: (a: Error | null) => any): Promise<any> {
    return this.fireDatabase.database.ref(whereTo).set(what, onComplete);
  }

  pushChildAtRootGetKey(child: string, pushValue?: string, onComplete?: (a: Error | null) => any): string {
    return this.fireDatabase.database.ref().child(child).push(pushValue, onComplete).key;
  }

  read(where: string, whatEvent: firebase.database.EventType = 'value'): Promise<firebase.database.DataSnapshot> {
    return this.fireDatabase.database.ref(where).once(whatEvent);
  }

  listen(onWhat: string, callback: (a: firebase.database.DataSnapshot | null, b?: string) => any, whatEvent: firebase.database.EventType = 'value'): void {
    this.fireDatabase.database.ref(onWhat).on(whatEvent, callback);
  }

  removeListener(onWhat: string, callback?: (a: firebase.database.DataSnapshot | null, b?: string) => any, whatEvent: firebase.database.EventType = 'value'): void {
    this.fireDatabase.database.ref(onWhat).off(whatEvent, callback);
  }

  update(path: string, updates: object, onComplete?: (a: Error | null) => any): Promise<any> {
    return this.fireDatabase.database.ref().child(path).update(updates, onComplete);
  }

  delete(what: string, onComplete?: (a: Error | null) => any): Promise<any> {
    return this.fireDatabase.database.ref(what).remove(onComplete);
  }

  getTheRef(path: string): firebase.database.Reference {
    return this.fireDatabase.database.ref(path);
  }

  setUserInfoForRegistration(credentials: UserInfoForRegister): void {
    this.userInfoForRegistering = credentials;
  }

  exposeUserRegInfo(): UserInfoForRegister {
    return this.userInfoForRegistering;
  }
}
