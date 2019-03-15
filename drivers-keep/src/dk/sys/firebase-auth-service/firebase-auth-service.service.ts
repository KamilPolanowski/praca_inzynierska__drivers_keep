import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth } from 'firebase/app';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState.pipe(share());

  constructor(private fireAuth: AngularFireAuth) {}

  public exposeUserState(): Observable<firebase.User | null> {
    return this.authState$;
  }

  public getUserInfo(): firebase.User {
    return this.fireAuth.auth.currentUser;
  }

  /* public accessAppVerifier(elementId: string): firebase.auth.RecaptchaVerifier {
    return new firebaseAuth.RecaptchaVerifier(elementId);
  } */

  public singInWithAnEmail(email: string, password: string): Promise<firebaseAuth.UserCredential> {
    return this.setPersistence(firebaseAuth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    });
  }

  public setPersistence(persistence: firebaseAuth.Auth.Persistence): Promise<void> {
    return this.fireAuth.auth.setPersistence(persistence);
  }

  /* public signInWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
    const session = firebaseAuth.Auth.Persistence.NONE;

    return this.fireAuth.auth.setPersistence(session).then(() => {
      return this.fireAuth.auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
    });
  } */

  /* public verifySMSCode(confirmationResult: Promise<firebase.auth.ConfirmationResult>, verificationCode: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      confirmationResult.then(confirmRes => {
        return confirmRes.confirm(verificationCode);

      }).then(result => {
        console.log('result', result);
        this.user = result.user;
        resolve(true);

      }).catch(err => console.error(err));
    });
  } */

  public registerNewUserViaEmail(email: string, password: string): Promise<firebaseAuth.UserCredential> {
    return this.setPersistence(firebaseAuth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
    });
  }
}
