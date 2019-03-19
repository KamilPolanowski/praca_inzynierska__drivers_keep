import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'drivers-keep-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewJobComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
