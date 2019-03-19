import { Injectable } from '@angular/core';
import {
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from '@drivers-keep-shared/services/firebase-auth-service/firebase-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router) { }

  /**
   * This guard is responsible for authentication of a user on a whole-app level
   *
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   * @returns Promise<boolean>
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // console.log('canActivate', state.url);
    // this.setRedirectURL(state.url);
     return this.isLoggedIn();
  }

  /**
   * This guard is responsible for authentication during router events in child routes
   *
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   * @returns Promise<boolean>
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // console.log('canActivateChild', state.url);
    // this.setRedirectURL(state.url);
    return this.isLoggedIn();
  }

  /**
   * This guard restricts loading of (lazy) modules
   *
   * @param  {Route} route
   * @returns boolean
   */
  canLoad(route: Route): boolean {
    // console.log('canLoad', route.path);
    // this.setRedirectURL(route.path);
    return true;
  }

  /**
   * Checks if user is logged
   *
   * @returns Promise
   */
  isLoggedIn(): Promise<boolean> { // TO TAKIE SLABE RACZEJ, OBS TEZ SREDNIO DZIALA
    return new Promise<boolean>(resolve => {
      const stateSub: Subscription = this.firebaseAuthService.exposeUserState().subscribe(userState => {
        if (!!userState && !!userState.uid) {
          stateSub.unsubscribe();
          resolve(true);
        } else {
          stateSub.unsubscribe();
          this.router.navigate(['/authorization']);
          resolve(false);
        }
      });
    });
  }

  /**
   * Sets URL used for redirecting
   *
   * @param  {string} url
   * @returns void
   */
  /* private setRedirectURL(url: string): void {
    console.log('url', url);
  } */
}
