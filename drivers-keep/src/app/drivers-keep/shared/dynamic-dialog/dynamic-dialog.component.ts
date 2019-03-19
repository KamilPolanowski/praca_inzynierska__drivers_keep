import { Component, OnInit, Inject, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { DynamicDialogService } from './dynamic-dialog.service';
import { DynamicDialogDirective } from './dynamic-dialog.directive';
import { DynamicDialogData, DynamicComponent } from './dynamic-dialog-data';
/**
 * Dynamic Dialog Component - main idea is not to create a new dialog
 * every time with different content. Frame of a dialog remains the same
 * throughout the application, what is changed is dynamic content inside
 * the body. This makes components reusable as normal components, not
 * sctrictly assigned to each and different dialog.
 */
@Component({
  selector: 'drivers-keep-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush - need to test*/
})
export class DynamicDialogComponent implements OnInit, OnDestroy {
  public dialogResult: any;
  private dialogResultSub: Subscription;
  @ViewChild(DynamicDialogDirective) compHost: DynamicDialogDirective;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    private dialogService: DynamicDialogService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public dialogData: DynamicDialogData) { }

  ngOnInit() {
    this.subscribeToResultFromDynamicComponent();
    this.loadComponent();
  }

  /**
   * Start a stream that awaits for a closing response from Dynamic Component
   *
   * @returns void
   */
  subscribeToResultFromDynamicComponent(): void {
    this.dialogResultSub = this.dialogService.observeResultFromDynamicComponent().subscribe(result => {
      this.dialogResult = result;
    });
  }

  /**
   * Uses Component Factory Resolver to create Dynamic Component
   * via Dynamic Directive anchor
   *
   * @returns void
   */
  loadComponent(): void {
    if (!!this.dialogData && this.dialogData.dynamic_component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dialogData.dynamic_component);
      const viewContainerRef = this.compHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DynamicComponent>componentRef.instance).startingData = this.dialogData.input;
    }
  }

  /**
   * Initialize closing of this dialog via closing callback
   *
   * @returns void
   */
  closeDialog(): void {
    this.dialogData.closingCb();
  }

  ngOnDestroy(): void {
    if (!!this.dialogResultSub) {
      this.dialogResultSub.unsubscribe();
    }
    this.dialogData = null;
  }
}
