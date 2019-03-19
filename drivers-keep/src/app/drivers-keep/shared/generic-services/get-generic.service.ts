import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TypeGuardsClass } from '../type-guards/type-guard.class';

@Injectable({
  providedIn: 'root',
})
export class GetGenericService extends TypeGuardsClass {

  constructor(private http: HttpClient) { super(); }

  /**
   * GET generic service
   *
   * @param  {string} url
   * @param  {T} getParams?
   * @returns Observable
   */
  httpGet<T>(url: string, getParams?: object): Observable<T> {
    if (!!url) {
      return this.http.get<T>(url, {
        params: this.setHttpParams(getParams)
      });
    }
  }

  /**
   * Setting object's properties as HttpParams
   *
   * @param  {object} toSet
   * @returns HttpParams
   */
  setHttpParams(toSet: object): HttpParams {
    let params: HttpParams = new HttpParams();
    if (this.isObject(toSet)) {
      for (const key in toSet) {
        if (toSet.hasOwnProperty(key)) {
          params = params.set(key, toSet[key]);
        }
      }
      return params;
    } else {
      // error about params
      return params;
    }
  }
}
