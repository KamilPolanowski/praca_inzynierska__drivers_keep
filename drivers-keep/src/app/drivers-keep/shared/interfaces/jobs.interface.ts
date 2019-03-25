import { Point } from '@drivers-keep-shared/components/here-maps/heremaps.interfaces';

export class JobData {
  name: string = '';
  surname: string = '';
  city: string = '';
  zipcode: string = '';
  phoneNumber: string = '';
}

export class JobDataSender extends JobData {
  address: string = '';
}

export interface ReceiverLocationData {
  coordinates: Point;
  locationId: string;
  displayValue: string;
  zipcode: string;
}

export class JobDataReceiver extends JobData {
  address: ReceiverLocationData = {
    coordinates: {
      lat: '',
      lng: ''
    },
    locationId: '',
    displayValue: '',
    zipcode: ''
  };
}

export class JobDetails {
  contains: string = '';
  size: string = '';
  weight: string = '';
  documentsToReturn: string = '';
  description: string = '';
}

export class Job {
  details: JobDetails = new JobDetails();
  receiver: JobDataReceiver = new JobDataReceiver();
  sender: JobDataSender = new JobDataSender();
}

export interface JobDatabase extends Job {
  driver_id: string;
  driver_full_name: string;
  assigned: boolean;
  added_date: string;
  deilivered: boolean;
}
