import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { JobDatabase } from '@drivers-keep-shared/interfaces/jobs.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'drivers-keep-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewAllJobsComponent implements OnInit {
  public jobsArr: JobDatabase[] = [];
  public jobsIds: string[] = [];

  constructor(
    private firebaseDatabaseService: FirebaseDatabaseService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() { // TODO: stronicowanie
    this.firebaseDatabaseService.read('/jobs').then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        const jobs: [string, JobDatabase][] = Object.entries(snapshot.val());

        for (const [jobId, properties] of jobs) {
          this.jobsArr.push(properties);
          this.jobsIds.push(jobId);
        }
      }
    }).finally(() => this.cd.detectChanges());
  }

  public editJob(index: number): void {
    this.router.navigate(['/drivers-keep/magazyn/zlecenie/' + this.jobsIds[index]]);
  }

}
