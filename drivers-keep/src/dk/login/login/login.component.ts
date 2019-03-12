import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseAuthServiceService } from '../../sys/firebase-auth-service/firebase-auth-service.service';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'dk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
})
export class LoginComponent implements OnInit {
  public phoneNumber: string = '+48123456789';
  public verificationCode: string = '123456';
  public confirmationResult: Promise<firebase.auth.ConfirmationResult>;
  public user: User;

  constructor(
    private firebaseAuthService: FirebaseAuthServiceService,
    private router: Router) { }

  ngOnInit() {
    this.firebaseAuthService.exposeUserState().subscribe(state => {
      console.log('state', state);
      if (!!state) {
        this.router.navigate['/main-page'].then(routing => {
          console.log('routing', routing);
        });
      }
    });
  }

  public signInWithPhoneNumber(): void {
    this.confirmationResult = this.firebaseAuthService.signInWithPhoneNumber(this.phoneNumber.toString(),
      this.firebaseAuthService.createAppVerifier('recaptcha-container'));
  }

  public verifyLoginCode(): void {
    this.firebaseAuthService.verifySMSCode(this.confirmationResult, this.verificationCode).then(verified => {
      if (verified) {
        console.log('verified', verified);
        this.router.navigate['/main-page'].then((routing: boolean) => {
          console.log('routing po verify', routing);
        });
      }
    });
  }
}
