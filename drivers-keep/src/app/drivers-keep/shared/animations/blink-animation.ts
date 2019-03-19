import { animation, animate, keyframes, style } from '@angular/animations';

export const blinkAnimation = animation([
  animate('{{ time }}', keyframes([
    style({ opacity: 1, offset: 0 }),
    style({ opacity: 0.1, offset: 0.4 }),
    style({ opacity: 0, offset: 0.5 }),
    style({ opacity: 0.1, offset: 0.6 }),
    style({ opacity: 1, offset: 1 })
  ]))
]);
