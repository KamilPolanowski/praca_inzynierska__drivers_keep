import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TypeGuardsClass } from './../type-guards/type-guard.class';

@Injectable({
  providedIn: 'root',
})
export class PostGenericService extends TypeGuardsClass {

  constructor(private http: HttpClient) { super(); }

  /**
   * POST generic service
   *
   * @param  {string} url
   * @param  {object} postBody?
   * @returns Observable
   */
  httpPost<T>(url: string, postBody?: object): Observable<T> {
    if (!!url) {
      if (this.isObject(postBody)) {
        return this.http.post<T>(url, postBody);
      } else {
        // error
      }
    }
  }
}
