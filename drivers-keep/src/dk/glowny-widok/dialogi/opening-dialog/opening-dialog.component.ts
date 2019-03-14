import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseDatabaseService } from '@dk-sys/firebase-database-service/firebase-database.service';
import { UserKinds } from '@dk-shared/interfaces/database-structures/users.interface';

export interface OpeningDialogData {
  uid: string;
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
}

@Component({
  selector: 'dk-opening-dialog',
  templateUrl: './opening-dialog.component.html',
  styleUrls: ['./opening-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpeningDialogComponent implements OnInit, OnDestroy {
  public disableResend: boolean = false;
  public phoneNumberPresent: boolean = false;
  public namePresent: boolean = false;
  public surnamePresent: boolean = false;
  public safeToCloseDialog: boolean = false;
  private kindListenerRef: firebase.database.Reference;

  constructor(
    // public dialogRef: MatDialogRef<OpeningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public openingData: OpeningDialogData,
    private firebaseDatabaseService: FirebaseDatabaseService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!!this.openingData) {
      if (!!this.openingData.uid) {
        this.listenOnPermissionChange(this.openingData.uid);
      }
      if (!!this.openingData.phoneNumber) {
        this.phoneNumberPresent = true;
      }

      if (!!this.openingData.name) {
        this.namePresent = true;
      }

      if (!!this.openingData.surname) {
        this.surnamePresent = true;
      }

      if (this.phoneNumberPresent && this.namePresent && this.surnamePresent) {
        this.disableResend = true;
      }
    }
  }

  public confirmPhoneNumber(data: OpeningDialogData): void {
    const updates: object = {
      phoneNumber: data.phoneNumber,
      name: data.name,
      surname: data.surname
    };
    this.firebaseDatabaseService.update('/users/' + this.openingData.uid, updates, err => {
      if (!(!!err)) {
        this.disableResend = true;
        this.cd.detectChanges();
      } else {
        console.error('confirmPhoneNumber', err);
      }
    });
  }

  private listenOnPermissionChange(userId: string): void {
    this.kindListenerRef = this.firebaseDatabaseService.getTheRef('/users/' + userId + '/kind');
    this.kindListenerRef.on('value', snapshot => {
      if (snapshot.val() !== UserKinds.Awaits) {
        this.safeToCloseDialog = true;
        this.cd.detectChanges();
      } else {
        this.safeToCloseDialog = false;
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (!!this.kindListenerRef) {
      this.kindListenerRef.off('value');
    }
  }

}
