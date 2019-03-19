import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drivers-keepComponentHost]',
})
export class DynamicDialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
