import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth } from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserKinds, UserCredentials } from '@drivers-keep-shared/interfaces/users.interface';
import { FirebaseDatabaseService } from '../firebase-database-service/firebase-database.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  private readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState.pipe(share());
  private userCredentials: UserCredentials;
  private stateSub: Subscription;

  constructor(
    private fireAuth: AngularFireAuth,
    private firebaseDatabaseService: FirebaseDatabaseService) {}

  public exposeUserState(): Observable<firebase.User | null> {
    return this.authState$;
  }

  public saveUserCredentials(uid: string, userKind: UserKinds): UserCredentials {
    const userCredentials: UserCredentials = {
      uid, permission: userKind
    };

    return this.userCredentials = userCredentials;
  }

  public exposeUserCredentials(): UserCredentials {
    return this.userCredentials;
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

  public getUserPermissions(): Promise<UserCredentials> {
    return new Promise<UserCredentials>(resolve => {
      this.stateSub = this.exposeUserState().subscribe(userState => {
        if (!!userState && !!userState.uid) {
          this.firebaseDatabaseService.read('/users/' + userState.uid).then(snapshot => {
            if (!!snapshot && !!snapshot.val() && snapshot.val().kind) {
              resolve(this.saveUserCredentials(userState.uid, snapshot.val().kind));
            }
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (!!this.stateSub) {
      this.stateSub.unsubscribe();
    }
  }
}
