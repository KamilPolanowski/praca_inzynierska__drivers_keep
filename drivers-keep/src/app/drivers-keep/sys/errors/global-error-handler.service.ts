import { Injectable, ErrorHandler, /* Injector */ } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const date = new Date();

    if (error instanceof HttpErrorResponse) {
      console.error(date, error.message, 'Status code: ',
        (error as HttpErrorResponse).status);
    } else if (error instanceof TypeError) {
      console.error(date, error.message, error.stack);
    } else if (error instanceof Error) {
      console.error(date, error.message, error.stack);
    } else {
      console.error(date, error);
    }
  }
}
