import { Injectable } from '@angular/core';
import {
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import { FirebaseAuthService } from '@dk-sys/firebase-auth-service/firebase-auth-service.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private firebaseAuthService: FirebaseAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.isLoggedIn();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.isLoggedIn();
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const stateSub: Subscription = this.firebaseAuthService.exposeUserState().subscribe(userState => {
        if (!!userState && !!userState.uid) {
          stateSub.unsubscribe();
          resolve(true);
        } else {
          stateSub.unsubscribe();
          resolve(false);
        }
      });
    });
  }
}
