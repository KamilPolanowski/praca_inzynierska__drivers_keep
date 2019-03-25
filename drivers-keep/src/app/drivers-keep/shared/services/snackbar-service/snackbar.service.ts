import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}


  public openSnackBar(message: string, action?: string, config?: MatSnackBarConfig<any>): void {
    this.snackBar.open(message, action, config);
  }
}
