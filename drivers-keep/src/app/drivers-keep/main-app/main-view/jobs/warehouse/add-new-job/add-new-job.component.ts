import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NewJobOutput } from '@drivers-keep-shared/interfaces/jobs.interface';
import { AssigningWorkersToJobsService } from '../../services/assigning-workers-to-jobs.service';

@Component({
  selector: 'drivers-keep-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewJobComponent implements OnInit {

  constructor(
    private assigningWorkersToJobsService: AssigningWorkersToJobsService
  ) { }

  ngOnInit() {
  }

  public afterSavingForm(output: NewJobOutput): void {
    console.log('output', output);
    // const newKey: string = this.firebaseDatabaseService.pushChildAtRootGetKey('/active');
    this.assigningWorkersToJobsService.assignWorker(output);
  }

}
