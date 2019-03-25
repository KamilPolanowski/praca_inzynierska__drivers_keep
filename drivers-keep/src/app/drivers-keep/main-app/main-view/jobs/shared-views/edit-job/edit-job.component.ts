import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { Job, JobDatabase } from '@drivers-keep-shared/interfaces/jobs.interface';

@Component({
  selector: 'drivers-keep-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditJobComponent implements OnInit {
  public order: Job = new Job();

  constructor(
    private firebaseDatabaseService: FirebaseDatabaseService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.firebaseDatabaseService.read('/jobs/' + this.route.snapshot.paramMap.get('jid')).then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        const response: JobDatabase = snapshot.val() as JobDatabase;

        this.order = {
          receiver: response.receiver,
          details: response.details,
          sender: response.sender
        };
        this.cd.detectChanges();
      }
    });
  }


  // TODO funkcja na porownanie this.order z outputem z edycji
}
