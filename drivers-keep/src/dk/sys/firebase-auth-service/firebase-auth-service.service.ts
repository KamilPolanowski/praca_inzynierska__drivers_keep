import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth as firebaseAuth } from 'firebase/app';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthServiceService {
  private readonly authState$: Observable<User | null> = this.fireAuth.authState.pipe(share());
  private user: User;

  constructor(private fireAuth: AngularFireAuth) {}

  public exposeUserState(): Observable<User | null> {
    return this.authState$;
  }

  public createAppVerifier(elementId: string): firebase.auth.RecaptchaVerifier {
    return new firebaseAuth.RecaptchaVerifier(elementId);
  }

  public signInWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
    return this.fireAuth.auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
  }

  public verifySMSCode(confirmationResult: Promise<firebase.auth.ConfirmationResult>, verificationCode: string): Promise<boolean> {
    return new Promise<boolean>(() => {
      confirmationResult.then(confirRes => {
        return confirRes.confirm(verificationCode);

      }).then(result => {
        this.user = result.user;
        return true;

      }).catch(err => console.error(err));
    });
  }

  public returnUserInfo(): User {
    return this.user;
  }
}
