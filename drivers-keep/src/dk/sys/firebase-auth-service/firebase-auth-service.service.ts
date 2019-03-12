import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  public accessAppVerifier(elementId: string): firebase.auth.RecaptchaVerifier {
    return new firebaseAuth.RecaptchaVerifier(elementId);
  }

  public signInWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
    const session = firebaseAuth.Auth.Persistence.NONE;

    return this.fireAuth.auth.setPersistence(session).then(() => {
      return this.fireAuth.auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
    });
  }

  public verifySMSCode(confirmationResult: Promise<firebase.auth.ConfirmationResult>, verificationCode: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      confirmationResult.then(confirmRes => {
        return confirmRes.confirm(verificationCode);

      }).then(result => {
        console.log('result', result);
        this.user = result.user;
        resolve(true);

      }).catch(err => console.error(err));
    });
  }

  public registerNewUser(email: string, password: string): Promise<firebaseAuth.UserCredential> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public returnUserInfo(): User {
    return this.user;
  }
}
