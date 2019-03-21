import { Injectable } from '@angular/core';
import { DatabaseUser } from '@drivers-keep-shared/interfaces/users.interface';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: [string, DatabaseUser][]; // z tego obs
  private getUsersPromise: Promise<any>;
  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {}

  public getUsers(): void {
    this.getUsersPromise = this.firebaseDatabaseService.read('/users').then(snapshot => {
      
    });
  }

  public saveUsersFromEntries(users: [string, DatabaseUser][]): void {
    for (const [uid, properties] of users) {
      if (!!uid && !!properties) {
        this.users.push([uid, properties]);
      }
    }
    console.log('this.users', this.users);
  }

  public exposeUsers(): [string, DatabaseUser][] {
    return this.users;
  }
}
