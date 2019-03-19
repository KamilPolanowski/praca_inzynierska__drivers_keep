import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DialogConfig, DynamicDialogData } from './dynamic-dialog-data';

/*
 * Custom overlay for opening Dynami Dialog
 */
@Injectable({
  providedIn: 'root',
})
export class DriversKeepDialog {
  private dialogRef: MatDialogRef<DynamicDialogComponent>;

  constructor(
    private dialog: MatDialog) { }

  /**
   * Opens Dynamic Dialog
   *
   * @param  any componentToResolve
   * @param  DialogConfig<T> dialogConfig
   * @returns MatDialogRef
   */
  public open<T = any>(componentToResolve: any, dialogConfig: DialogConfig<T>): MatDialogRef<DynamicDialogComponent> {
    const configCopy: DialogConfig<T> = JSON.parse(JSON.stringify(dialogConfig));

    const newData: DynamicDialogData<T> = {
      draggable: !!configCopy.draggable,
      dynamic_component: componentToResolve,
      title: configCopy.title,
      input: configCopy.data,
      closingCb: () => this.close()
    };

    delete configCopy.title;
    delete configCopy.draggable;
    delete configCopy.data;

    const config = {
      data: newData,
      ...configCopy
    };

    return this.dialogRef = this.dialog.open(DynamicDialogComponent, config);
  }

  /**
   * Closing Dynamic Dialog
   *
   * @returns void
   */
  public close(): void {
    this.dialogRef.close();
  }
}
