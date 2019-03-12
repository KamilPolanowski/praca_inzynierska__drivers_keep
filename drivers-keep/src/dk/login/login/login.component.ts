import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'firebase/app';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { FirebaseAuthServiceService } from '@dk-sys/firebase-auth-service/firebase-auth-service.service';

type CurrentView = 'enter-phone-number' | 'enter-verification-code' | 'register';

@Component({
  selector: 'dk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
})
export class LoginComponent implements OnInit {
  public currentView: CurrentView;
  public phoneNumber: FormControl = new FormControl('+48123456789', [Validators.required]);
  public verificationCode: FormControl = new FormControl('123456');
  // public phoneNumber: string = '+48123456789';
  // public verificationCode: string = '123456';
  public confirmationResult: Promise<firebase.auth.ConfirmationResult>;
  public user: User;
  public captchaContainer: firebase.auth.RecaptchaVerifier;
  public title: string;

  constructor(
    private firebaseAuthService: FirebaseAuthServiceService,
    private router: Router) { }

  ngOnInit() {
    this.viewSwitcher('enter-phone-number');

    this.firebaseAuthService.exposeUserState().subscribe(state => {
      console.log('state', state);
      if (!!state) {
        this.router.navigate['/glowny-widok'];
      }
    });

    setTimeout(() => {
      this.captchaContainer = this.firebaseAuthService.accessAppVerifier('recaptcha-container');
      this.captchaContainer.render();
    }, 500);
  }

  public viewSwitcher(whereTo: CurrentView): void {
    this.currentView = whereTo;
    this.setTitle(whereTo);
  }

  private setTitle(whereTo: CurrentView): void {
    switch (whereTo) {
      case 'enter-phone-number':
        this.title = `Zaloguj się do Drivers' Keep`;
        break;
      case 'enter-verification-code':
        this.title = `Potwierdź kod weryfikacyjny`;
        break;
      case 'register':
        this.title = `Zarejestruj się do Drivers' Keep`;
        break;
    }
  }

  public signInWithPhoneNumber(): void {
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
  }

  public verifyLoginCode(): void {
    this.firebaseAuthService.verifySMSCode(this.confirmationResult, this.verificationCode.value).then(verified => {
      console.log('verified', verified);
      if (verified) {
        this.router.navigate['/glowny-widok'];
      }
    });
  }
}
