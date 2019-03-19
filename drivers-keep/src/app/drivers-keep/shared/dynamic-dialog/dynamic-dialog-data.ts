import { MatDialogConfig } from '@angular/material';

export interface DialogConfig<T = any> extends MatDialogConfig<T> {
  title: string;
  draggable?: boolean;
}

export interface DynamicDialogData<T = any> {
  draggable?: boolean;
  dynamic_component: any;
  title: string;
  input: T;
  closingCb?: () => void;
}

export interface DynamicComponent {
  startingData: any;
}
