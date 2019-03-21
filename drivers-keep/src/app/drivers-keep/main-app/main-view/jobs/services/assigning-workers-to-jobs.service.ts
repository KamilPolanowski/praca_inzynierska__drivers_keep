import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { NewJobOutput, JobForDatabase } from '@drivers-keep-shared/interfaces/jobs.interface';
import { UserKinds, DatabaseUser } from '@drivers-keep-shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AssigningWorkersToJobsService {
  constructor(private firebaseDatabaseService: FirebaseDatabaseService) { }

  public assignWorker(output: NewJobOutput): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.firebaseDatabaseService.read('/users').then(snapshot => {
        if (!!snapshot && !!snapshot.val()) {
          const users: [string, DatabaseUser][] = Object.entries(snapshot.val());
          let userId: string = '';
          let workerFound: boolean = false;
          let workerName: string = '';

          for (const [uid, properties] of users) {
            if (properties.kind === UserKinds.Pracownik) {
              if (!!properties.additional_duties) {
                if (properties.additional_duties.assigned_zipcodes.includes(output.receiver.receiver_address.postalCode)) {
                  userId = uid;
                  workerFound = true;
                  workerName = properties.name + ' ' + properties.surname;
                }
              }
            }
          }

          const jobKey: string = this.firebaseDatabaseService.pushChildAtRootGetKey('jobs');

          const addNewJob: JobForDatabase = {
            ...output,
            driver_id: userId,
            driver_full_name: workerName,
            assigned: workerFound,
            added_date: format(new Date(), 'DD-MM-YYYY HH:mm'),
            deilivered: false
          };

          this.firebaseDatabaseService.write('/jobs/' + jobKey, addNewJob);

          resolve(workerFound);
        }
      }).catch(err => { throw err; });
    });
  }
}
