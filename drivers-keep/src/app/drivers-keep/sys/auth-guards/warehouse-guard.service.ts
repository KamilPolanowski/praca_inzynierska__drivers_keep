import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { FirebaseAuthService } from '@drivers-keep-shared/services/firebase-auth-service/firebase-auth-service.service';
import { UserCredentials, UserKinds } from '@drivers-keep-shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGuard implements CanActivate {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.userHasWarehousePermissions();
  }

  private userHasWarehousePermissions(): boolean | Promise<boolean> {
    const userCredentials: UserCredentials = this.firebaseAuthService.exposeUserCredentials();
    if (!!userCredentials && !!userCredentials.permission) {
      if (userCredentials.permission === UserKinds.Magazynier) {
        return true;
      } else {
        return false;
      }
    } else {
      return new Promise<boolean>(resolve => {
        this.firebaseAuthService.getUserPermissions().then(userCred => {
          if (userCred.permission === UserKinds.Magazynier) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
  }
}
