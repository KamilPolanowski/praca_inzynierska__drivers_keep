import { Point } from '@drivers-keep-shared/components/here-maps/heremaps.interfaces';

export class Job {
  // tslint:disable-next-line: no-use-before-declare
  receiver_data: JobDataReceiver = new JobDataReceiver();
  // tslint:disable-next-line: no-use-before-declare
  sender_data: JobDataSender = new JobDataSender();
  // tslint:disable-next-line: no-use-before-declare
  details: JobDetails = new JobDetails();
}

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
  postalCode: string;
}

export class JobDataReceiver extends JobData {
  address: ReceiverLocationData = {
    coordinates: {
      lat: '',
      lng: ''
    },
    locationId: '',
    displayValue: '',
    postalCode: ''
  };
}

export class JobDetails {
  contains: string = '';
  size: string = '';
  weight: string = '';
  documentsToReturn: string = '';
  description: string = '';
}

export interface NewJobOutput {
  details: {
    detail_contains: string;
    detail_description: string;
    detail_documentsToReturn: string;
    detail_size: string;
    detail_weight: string;
  };
  receiver: {
    receiver_address: ReceiverLocationData;
    receiver_city: string;
    receiver_name: string;
    receiver_phoneNumber: string;
    receiver_surname: string;
    receiver_zipcode: string;
  };
  sender: {
    sender_address: string;
    sender_city: string;
    sender_name: string;
    sender_phoneNumber: string;
    sender_surname: string;
    sender_zipcode: string;
  };
}

export interface JobForDatabase extends NewJobOutput {
  driver_id: string;
  driver_full_name: string;
  assigned: boolean;
  added_date: string;
  deilivered: boolean;
}
