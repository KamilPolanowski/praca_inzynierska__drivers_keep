import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseDatabaseService } from '@dk-sys/firebase-database-service/firebase-database.service';
import { UserInfoForRegister, UserKinds, DatabaseUser } from '@dk-shared/interfaces/database-structures/users.interface';
import { FirebaseAuthService } from '@dk-sys/firebase-auth-service/firebase-auth-service.service';
import { OpeningDialogComponent, OpeningDialogData } from '../dialogi/opening-dialog/opening-dialog.component';

@Component({
  selector: 'dk-glowny-widok',
  templateUrl: './glowny-widok.component.html',
  styleUrls: ['./glowny-widok.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlownyWidokComponent implements OnInit, OnDestroy {
  private userToRegister: UserInfoForRegister = this.firebaseDatabaseService.exposeUserRegInfo();
  public renderView: boolean = false;
  private kindListenerRef: firebase.database.Reference;
  private userStateSub: Subscription;

  constructor(
    private firebaseDatabaseService: FirebaseDatabaseService,
    private firebaseAuthService: FirebaseAuthService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    if (!!this.userToRegister) {
      this.firebaseDatabaseService.write('/users/' + this.userToRegister.key, this.userToRegister.toRegister)
      .then(() => {
        this.firebaseDatabaseService.read('/users/' + this.userToRegister.key).then(snapshot => {
          if (!!snapshot && !!snapshot.val() && snapshot.val().kind === UserKinds.Awaits) {
            this.openWelcomingDialog(snapshot.val(), this.userToRegister.key);
            this.listenOnPermissionChange(this.userToRegister.key);
          }
        });
      })
      .catch(err => { throw err; });
    } else {
      this.userStateSub = this.firebaseAuthService.exposeUserState().subscribe(userState => {
        if (!!userState) {
          if (!!userState.uid) {
            this.firebaseDatabaseService.read('/users/' + userState.uid).then(snapshot => {
              if (!!snapshot && !!snapshot.val()) {
                if (snapshot.val().kind === UserKinds.Awaits) {
                  this.openWelcomingDialog(snapshot.val(), userState.uid);
                  this.listenOnPermissionChange(userState.uid);
                } else {
                  this.checkUserPermissionsToValidateView(snapshot.val().kind);
                }
              }
            });
          }
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  private openWelcomingDialog(snapshot: DatabaseUser, userId: string): void {
    const dataToPass: OpeningDialogData = {
      uid: userId,
      email: snapshot.email,
      phoneNumber: snapshot.phoneNumber,
      name: snapshot.name,
      surname: snapshot.surname
    };
    this.dialog.open(OpeningDialogComponent, {
      data: dataToPass,
      width: '300px',
      height: '600px',
      disableClose: true
    });
  }

  private listenOnPermissionChange(userId: string): void {
    this.kindListenerRef = this.firebaseDatabaseService.getTheRef('/users/' + userId + '/kind');
    this.kindListenerRef.on('value', snapshot => {
      this.checkUserPermissionsToValidateView(snapshot.val());
    });
  }

  private checkUserPermissionsToValidateView(userKind: UserKinds): void {
    if (userKind === UserKinds.Magazynier) {
      this.handleWarehousePermissions();
    }
  }

  private handleWarehousePermissions(): void {
    this.renderView = true;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (!!this.kindListenerRef) {
      this.kindListenerRef.off('value');
    }

    if (!!this.userStateSub) {
      this.userStateSub.unsubscribe();
    }
  }

}
