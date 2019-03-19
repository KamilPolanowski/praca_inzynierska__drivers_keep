import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/*
 * Singleton service providing functions to communicate between
 * Dynamic Dialog and the results of Dynamic Components. Use to
 * get result of Dynamic Component computations and pass it as
 * a value to afterClosed() observer
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicDialogService {
  private passedResult: Subject<any> = new Subject<any>();

  constructor() { }

  /**
   * Opens a stream to a result of any Dynamic Component
   *
   * @returns Observable
   */
  observeResultFromDynamicComponent(): Observable<any> {
    return this.passedResult.asObservable();
  }

  /**
   * Updates value to return in afterClosed() stream
   *
   * @param  {any} result
   * @returns void
   */
  passDialogResult(result: any): void {
    this.passedResult.next(result);
  }
}
