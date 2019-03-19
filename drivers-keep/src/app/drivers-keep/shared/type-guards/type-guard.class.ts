import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeGuardsClass {
  constructor() { }

  /**
   * Type Guard for objects
   *
   * @param  {any} input
   * @returns inputisobject
   */
  isObject(input: any): input is object {
    return (!!input) && (typeof input === 'object')
      && (Object.getOwnPropertyNames(input).length > 0);
  }

  /**
   * Type Guard checking if all parameters are present
   * in input
   *
   * @param  {any} input
   * @param  {string[]} params
   * @returns inputisT
   */
  isDesiredTypeByParameters<T>(input: any, params: string[]): input is T {
    let isDesiredType: boolean = false;
    if (this.isObject(input)) {
      if (!!params && params.length > 0) {
        const objProps: string[] = Object.getOwnPropertyNames(input);
        type FuncType = (value: string, index: number, array: string[]) => boolean;
        const checkParams: FuncType = (value: string) => {
          return objProps.includes(value);
        };

        isDesiredType = params.every(checkParams);
      } else {
        // TODO notice: params empty! type not checked
      }
    } else {
      // TODO notice: input is not an object! type not checked
    }
    return isDesiredType;
  }
}
