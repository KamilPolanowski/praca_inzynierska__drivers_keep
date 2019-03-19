import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserInfoForRegister, UserKinds } from '@drivers-keep-shared/interfaces/users.interface';
import { FirebaseAuthService } from '@drivers-keep-shared/services/firebase-auth-service/firebase-auth-service.service';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';

type CurrentView = 'login' | 'verify-code' | 'register';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'dk-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public currentView: CurrentView;
  public email: FormControl = new FormControl('kpolanowski44@gmail.com', Validators.email);
  public password: FormControl = new FormControl('haselko123');
  // public phoneNumber: string = '+48123456789';
  // public verificationCode: string = '123456';
  public confirmationResult: Promise<firebase.auth.ConfirmationResult>;
  public captchaContainer: firebase.auth.RecaptchaVerifier;
  public title: string;
  public registrationError: string = '';
  private stateSub: Subscription;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseDataBaseService: FirebaseDatabaseService,
    private router: Router) { }

  ngOnInit() {
    this.viewSwitcher('login');

    this.stateSub = this.firebaseAuthService.exposeUserState().subscribe(state => {
      console.log('state', state);
      if (!!state) {
        // this.router.navigate(['/drivers-keep']); jakis komunikat bardziej
      }
    });

    /* setTimeout(() => {
      this.captchaContainer = this.firebaseAuthService.accessAppVerifier('recaptcha-container');
      this.captchaContainer.render();
    }, 500); */
  }

  public viewSwitcher(whereTo: CurrentView): void {
    this.currentView = whereTo;
    this.setTitle(whereTo);
  }

  private setTitle(whereTo: CurrentView): void {
    switch (whereTo) {
      case 'login':
        this.title = `Zaloguj się do Drivers' Keep`;
        break;
      case 'verify-code':
        this.title = `Potwierdź kod weryfikacyjny`;
        break;
      case 'register':
        this.title = `Zarejestruj się do Drivers' Keep`;
        break;
    }
  }

  public signInWithAnEmail(): void {
    this.firebaseAuthService.singInWithAnEmail(this.email.value, this.password.value).then(() => {
      this.router.navigate(['/drivers-keep']);
    }).catch(err => { throw err; });
  }

  public registerViaEmail(): void {
    this.firebaseAuthService.registerNewUserViaEmail(this.email.value, this.password.value).then(register => {
      const passInfoForRegisteringLater: UserInfoForRegister = {
        key: register.user.uid,
        toRegister: {
          email: register.user.email,
          phoneNumber: register.user.phoneNumber,
          kind: UserKinds.Awaits
        }
      };
      this.firebaseDataBaseService.setUserInfoForRegistration(passInfoForRegisteringLater);

      this.viewSwitcher('login');

    }).catch(err => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        this.registrationError = err.message;
      }
    });
  }

  /* public signInWithPhoneNumber(): void {
    this.confirmationResult = this.firebaseAuthService.signInWithPhoneNumber(this.phoneNumber.value,
      this.captchaContainer);

    if (!!this.confirmationResult) {
      this.confirmationResult.then(confRes => {
        if (!!confRes.verificationId) {
          this.captchaContainer.clear();
          this.viewSwitcher('enter-verification-code');
        }
      });
    }
  } */

 /*  public verifyLoginCode(): void {
    this.firebaseAuthService.verifySMSCode(this.confirmationResult, this.verificationCode.value).then(verified => {
      if (verified) {
        this.router.navigate['/glowny-widok'];
      }
    });
  } */

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }
}
