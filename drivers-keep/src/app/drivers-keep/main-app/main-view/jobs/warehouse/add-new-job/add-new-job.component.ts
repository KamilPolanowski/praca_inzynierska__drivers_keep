import { SnackbarService } from './../../../../../shared/services/snackbar-service/snackbar.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Job } from '@drivers-keep-shared/interfaces/jobs.interface';
import { AssigningWorkersToJobsService } from '../../services/assigning-workers-to-jobs.service';

@Component({
  selector: 'drivers-keep-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewJobComponent implements OnInit {

  constructor(
    private assigningWorkersToJobsService: AssigningWorkersToJobsService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
  }

  public afterSavingForm(output: Job): void {
    this.assigningWorkersToJobsService.assignWorker(output).then(workerFound => {
      if (workerFound) {
        this.snackbarService.openSnackBar('Dodano zlecenie!', 'Ok!', {
          duration: 3000
        });
      } else {
        this.snackbarService.openSnackBar('Dodano zlecenie, jednak NIE przypisano kierowcy!', 'Ok');
      }
    });
  }

}
