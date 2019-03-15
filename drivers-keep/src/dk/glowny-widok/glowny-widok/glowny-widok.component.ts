import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseDatabaseService } from '@dk-sys/firebase-database-service/firebase-database.service';
import { UserInfoForRegister, UserKinds, DatabaseUser } from '@dk-shared/interfaces/database-structures/users.interface';
import { FirebaseAuthService } from '@dk-sys/firebase-auth-service/firebase-auth-service.service';
import { OpeningDialogComponent, OpeningDialogData } from '../dialogi/opening-dialog/opening-dialog.component';

interface MenuElement {
  label: string;
  path: string;
}

interface MenuElementSnapshot {
  [prop: string]: MenuElement;
}

@Component({
  selector: 'dk-glowny-widok',
  templateUrl: './glowny-widok.component.html',
  styleUrls: ['./glowny-widok.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlownyWidokComponent implements OnInit, OnDestroy {
  public renderView: boolean = false;
  public tabs: MenuElement[] = [];
  private userToRegister: UserInfoForRegister = this.firebaseDatabaseService.exposeUserRegInfo();
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
            }).catch(err => { throw err; });
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
    this.getMenuElementsDependingOnUserPermissions(userKind);

    if (userKind === UserKinds.Magazynier) {
      this.handleWarehousePermissions();
    }
  }

  private handleWarehousePermissions(): void {
    this.renderView = true;
    this.cd.detectChanges();
  }

  private getMenuElementsDependingOnUserPermissions(userKind: UserKinds): void {
    this.firebaseDatabaseService.read('/menuElements/' + userKind).then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        this.prepareTabLabels(snapshot.val());
      }
    }).catch(err => { throw err; });
  }

  private prepareTabLabels(menuElSnap: MenuElementSnapshot): MenuElement[] | never {
    const tabOutput: MenuElement[] = [];
    if (!!menuElSnap) {
      Object.values(menuElSnap).forEach(value => {
        tabOutput.push(value);
      });
      this.cd.markForCheck();
      return this.tabs = tabOutput;
    } else {
      throw new Error('Błąd przy pobieraniu zakładek do menu - obiekt pusty');
    }
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
