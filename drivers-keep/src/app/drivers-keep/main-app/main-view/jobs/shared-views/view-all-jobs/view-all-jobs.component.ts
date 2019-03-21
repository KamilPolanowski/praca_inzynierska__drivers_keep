import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { JobForDatabase } from '@drivers-keep-shared/interfaces/jobs.interface';

@Component({
  selector: 'drivers-keep-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewAllJobsComponent implements OnInit {
  public jobsArr: JobForDatabase[] = [];
  public jobsIds: string[] = [];

  constructor(
    private firebaseDatabaseService: FirebaseDatabaseService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.firebaseDatabaseService.read('/jobs').then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        const jobs: [string, JobForDatabase][] = Object.entries(snapshot.val());

        for (const [jobId, properties] of jobs) {
          this.jobsArr.push(properties);
          this.jobsIds.push(jobId);
        }
      }
    }).finally(() => this.cd.detectChanges());
  }

}
