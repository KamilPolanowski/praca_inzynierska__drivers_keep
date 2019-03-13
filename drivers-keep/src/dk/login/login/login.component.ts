import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { FirebaseAuthServiceService } from '@dk-sys/firebase-auth-service/firebase-auth-service.service';
import { FirebaseDatabaseService } from '@dk-sys/firebase-database-service/firebase-database.service';
import { UserInfoForRegister } from '@dk-shared/interfaces/database-structures/users.interface';
import { Subscription } from 'rxjs';

type CurrentView = 'login' | 'verify-code' | 'register';

@Component({
  selector: 'dk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
})
export class LoginComponent implements OnInit, OnDestroy {
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
    private firebaseAuthService: FirebaseAuthServiceService,
    private firebaseDataBaseService: FirebaseDatabaseService,
    private router: Router) { }

  ngOnInit() {
    this.viewSwitcher('login');

    this.stateSub = this.firebaseAuthService.exposeUserState().subscribe(state => {
      console.log('state', state);
      if (!!state) {
        this.router.navigate(['/glowny-widok']);
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
      this.router.navigate(['/glowny-widok']);
    }).catch(err => console.error('login', err));
  }

  public registerViaEmail(): void {
    this.firebaseAuthService.registerNewUserViaEmail(this.email.value, this.password.value).then(register => {
      const passInfoForRegisteringLater: UserInfoForRegister = {
        key: register.user.uid,
        toRegister: {
          email: register.user.email,
          phoneNumber: register.user.phoneNumber,
          kind: 'awaits'
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
      console.log('verified', verified);
      if (verified) {
        this.router.navigate['/glowny-widok'];
      }
    });
  } */

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }
}
