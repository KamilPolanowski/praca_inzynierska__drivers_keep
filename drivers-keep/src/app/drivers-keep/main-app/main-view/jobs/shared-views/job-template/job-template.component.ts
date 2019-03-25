import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Job, ReceiverLocationData } from '@drivers-keep-shared/interfaces/jobs.interface';
import { GeocoderOutput, Point } from '@drivers-keep-shared/components/here-maps/heremaps.interfaces';

@Component({
  selector: 'drivers-keep-job-template',
  templateUrl: './job-template.component.html',
  styleUrls: ['./job-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobTemplateComponent implements OnInit, OnChanges {
  @Input() order: Job = new Job();
  @Input() viewMode: boolean = false;
  @Output() formOutput: EventEmitter<Job> = new EventEmitter;
  public form: FormGroup;
  public currentCoordinates: Point;
  private addressChosenFromGeocoder: boolean = false;
  private receiverAddress: ReceiverLocationData;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setForm(this.order);
  }

  ngOnChanges(): void {
    if (this.viewMode) {
      this.setForm(this.order);
    }
  }

  private setForm(order: Job): void {
    this.form = this.formBuilder.group({
      receiver_name: [{ value: order.receiver.name, disabled: this.viewMode }],
      receiver_surname: [{ value: order.receiver.surname, disabled: this.viewMode }],
      receiver_address: [{ value: order.receiver.address.displayValue, disabled: this.viewMode }],
      receiver_city: [{ value: order.receiver.city, disabled: this.viewMode }],
      receiver_zipcode: [{ value: order.receiver.zipcode, disabled: this.viewMode }],
      receiver_phoneNumber: [{ value: order.receiver.phoneNumber, disabled: this.viewMode }],
      sender_name: [{ value: order.sender.name, disabled: this.viewMode }],
      sender_surname: [{ value: order.sender.surname, disabled: this.viewMode }],
      sender_address: [{ value: order.sender.address, disabled: this.viewMode }],
      sender_city: [{ value: order.sender.city, disabled: this.viewMode }],
      sender_zipcode: [{ value: order.sender.zipcode, disabled: this.viewMode }],
      sender_phoneNumber: [{ value: order.sender.phoneNumber, disabled: this.viewMode }],
      detail_contains: [{ value: order.details.contains, disabled: this.viewMode }],
      detail_size: [{ value: order.details.size, disabled: this.viewMode }],
      detail_weight: [{ value: order.details.weight, disabled: this.viewMode }],
      detail_documentsToReturn: [{ value: order.details.documentsToReturn, disabled: this.viewMode }],
      detail_description: [{ value: order.details.description, disabled: this.viewMode }]
    });

    this.currentCoordinates = order.receiver.address.coordinates;
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
        zipcode: addressObj.zipcode
      };

      this.form.controls['receiver_zipcode'].setValue(addressObj.zipcode);
      this.cd.detectChanges();
    }
  }

  public saveValues(): void {
    if (this.addressChosenFromGeocoder) {
      const formValues = this.form.value;
      const output: Job = {
        details: {
          contains: formValues.detail_contains,
          description: formValues.detail_description,
          documentsToReturn: formValues.detail_documentsToReturn,
          size: formValues.detail_size,
          weight: formValues.detail_weight
        },
        receiver: {
          address: this.receiverAddress,
          city: formValues.receiver_city,
          name: formValues.receiver_name,
          phoneNumber: formValues.receiver_phoneNumber,
          surname: formValues.receiver_surname,
          zipcode: formValues.receiver_zipcode
        },
        sender: {
          address: formValues.sender_address,
          city: formValues.sender_city,
          name: formValues.sender_name,
          phoneNumber: formValues.sender_phoneNumber,
          surname: formValues.sender_surname,
          zipcode: formValues.sender_zipcode
        }
      };

      this.formOutput.emit(output);
    }
  }

  public unlockFromEditMode(): void {
    this.viewMode = false;
    this.setForm(this.order);
    this.cd.markForCheck();
    // TODO: output dla edit-job.comp, ktory w bazie zapisze modyfikacje
  }

}
