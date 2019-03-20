import { Injectable } from '@angular/core';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { NewJobOutput, JobForDatabase } from '@drivers-keep-shared/interfaces/jobs.interface';
import { UserKinds, DatabaseUser } from '@drivers-keep-shared/interfaces/users.interface';



@Injectable({
  providedIn: 'root'
})
export class AssigningWorkersToJobsService {
  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {  }

  public assignWorker(output: NewJobOutput) {
    this.firebaseDatabaseService.read('/users').then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        const users: [string, DatabaseUser][] = Object.entries(snapshot.val());

        for (const [uid, properties] of users) {
          if (properties.kind === UserKinds.Pracownik) {
            if (!!properties.additional_duties) {
              if (properties.additional_duties.assigned_zipcodes.includes(output.receiver.receiver_address.postalCode)) {
                const jobKey: string = this.firebaseDatabaseService.pushChildAtRootGetKey('jobs');

                const addNewJob: JobForDatabase = {
                  ...output,
                  job_id: jobKey,
                  driver_id: uid,
                  assigned: true,
                  added_date: new Date().toString()
                };

                this.firebaseDatabaseService.write('/jobs', addNewJob);
              }
            }
          }
        }
      }
    });
  }
}
