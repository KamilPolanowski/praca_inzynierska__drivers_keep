import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Job, NewJobOutput, ReceiverLocationData } from '@drivers-keep-shared/interfaces/jobs.interface';
import { GeocoderOutput } from '@drivers-keep-shared/components/here-maps/heremaps.interfaces';

@Component({
  selector: 'drivers-keep-job-template',
  templateUrl: './job-template.component.html',
  styleUrls: ['./job-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobTemplateComponent implements OnInit {
  @Input() order: Job = new Job();
  @Input() viewMode: boolean = false;
  @Output() formOutput: EventEmitter<NewJobOutput> = new EventEmitter;
  public form: FormGroup;
  private addressChosenFromGeocoder: boolean = false;
  private receiverAddress: ReceiverLocationData;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setForm(this.order);
  }

  private setForm(order: Job): void {
    this.form = this.formBuilder.group({
      receiver_name: [{ value: order.receiver_data.name, disabled: this.viewMode }],
      receiver_surname: [{ value: order.receiver_data.surname, disabled: this.viewMode }],
      receiver_address: [{ value: order.receiver_data.address.displayValue, disabled: this.viewMode }],
      receiver_city: [{ value: order.receiver_data.city, disabled: this.viewMode }],
      receiver_zipcode: [{ value: order.receiver_data.zipcode, disabled: this.viewMode }],
      receiver_phoneNumber: [{ value: order.receiver_data.phoneNumber, disabled: this.viewMode }],
      sender_name: [{ value: order.sender_data.name, disabled: this.viewMode }],
      sender_surname: [{ value: order.sender_data.surname, disabled: this.viewMode }],
      sender_address: [{ value: order.sender_data.address, disabled: this.viewMode }],
      sender_city: [{ value: order.sender_data.city, disabled: this.viewMode }],
      sender_zipcode: [{ value: order.sender_data.zipcode, disabled: this.viewMode }],
      sender_phoneNumber: [{ value: order.sender_data.phoneNumber, disabled: this.viewMode }],
      detail_contains: [{ value: order.details.contains, disabled: this.viewMode }],
      detail_size: [{ value: order.details.size, disabled: this.viewMode }],
      detail_weight: [{ value: order.details.weight, disabled: this.viewMode }],
      detail_documentsToReturn: [{ value: order.details.documentsToReturn, disabled: this.viewMode }],
      detail_description: [{ value: order.details.description, disabled: this.viewMode }]
    });
  }

  public isChosenFromGeocoder(isIt: boolean): void {
    this.addressChosenFromGeocoder = isIt;
    this.cd.detectChanges();
  }

  public addressFromGeocoder(addressObj: GeocoderOutput): void {
    if (this.addressChosenFromGeocoder) {
      this.receiverAddress = {
        coordinates: addressObj.coordinates,
        locationId: addressObj.locationId,
        displayValue: addressObj.displayValue,
        postalCode: addressObj.postalCode
      };

      this.form.controls['receiver_zipcode'].setValue(addressObj.postalCode);
      this.cd.detectChanges();
    }
  }

  public saveValues(): void {
    if (this.addressChosenFromGeocoder) {
      const formValues = this.form.value;
      const output: NewJobOutput = {
        details: {
          detail_contains: formValues.detail_contains,
          detail_description: formValues.detail_description,
          detail_documentsToReturn: formValues.detail_documentsToReturn,
          detail_size: formValues.detail_size,
          detail_weight: formValues.detail_weight
        },
        receiver: {
          receiver_address: this.receiverAddress,
          receiver_city: formValues.receiver_city,
          receiver_name: formValues.receiver_name,
          receiver_phoneNumber: formValues.receiver_phoneNumber,
          receiver_surname: formValues.receiver_surname,
          receiver_zipcode: formValues.receiver_zipcode
        },
        sender: {
          sender_address: formValues.sender_address,
          sender_city: formValues.sender_city,
          sender_name: formValues.sender_name,
          sender_phoneNumber: formValues.sender_phoneNumber,
          sender_surname: formValues.sender_surname,
          sender_zipcode: formValues.sender_zipcode
        }
      };

      this.formOutput.emit(output);
    } else {

    }
  }

}
