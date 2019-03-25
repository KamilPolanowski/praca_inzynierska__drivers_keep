import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { HereConfig } from '@drivers-keep-shared/classes/heremap.settings';
import { Point, GeocoderOutput } from '../heremaps.interfaces';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'here-geocode-autocomplete',
  templateUrl: './here-geocode-autocomplete.component.html',
  styleUrls: ['./here-geocode-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HereGeocodeAutocompleteComponent implements OnInit, OnChanges {
  @Input() city: string;
  @Input() initialAddress: string;
  @Input() placeholder: string;
  @Input() inputDisabled: boolean = false;
  @Input() currentCoordinates: Point;
  @Output() chosenAddress: EventEmitter<GeocoderOutput> = new EventEmitter;
  @Output() addressChosenFromGeocoder: EventEmitter<boolean> = new EventEmitter;
  public addresses: Observable<any[]>;
  public geoControl: FormControl = new FormControl();
  public hintValue: string;
  private geocoderResponse: any;
  private noAddress: any = [{ display: 'Nie znaleziono adresu!', value: '' }];
  private hereGeocoder: H.service.GeocodingService;
  private platform: H.service.Platform;

  constructor(
    private hereSettings: HereConfig,
    private cd: ChangeDetectorRef) { }


  ngOnChanges(): void {
    if (!!this.initialAddress) {
      this.geoControl.setValue(this.initialAddress);
    }

    if (this.inputDisabled) {
      this.geoControl.disable();
      this.cd.detectChanges();
    } else {
      this.geoControl.enable();
      this.cd.detectChanges();
    }
  }

  ngOnInit() {
    new Promise(platform => {
      platform(this.platform = new H.service.Platform(this.hereSettings.hereMapsApiKey));
    }).then(() => {
      this.hereGeocoder = this.platform.getGeocodingService();

      this.geoControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(newValue => {
          this.hereGeocode(newValue);
        });

    }).catch(err => { throw err; });
  }

  private hereGeocode(address: string): void {
    if (!!this.city) {
      this.hintValue = '';
      const parameters: H.service.ServiceParameters = {
        city: this.city,
        jsonattributes: '1',
        searchText: address
      };

      this.hereGeocoder.geocode(parameters,
        this.onGeocodeSuccess.bind(this),
        this.onGeocodeError.bind(this)
      );
    } else {
      this.hintValue = 'Wprowadź miasto!';
      this.cd.detectChanges();
    }
  }

  private onGeocodeSuccess(result: H.service.ServiceResult): void {
    this.geocoderResponse = result;
    this.addresses = of(this.parseGeoHereResponse(result));
    this.cd.detectChanges();
  }

  private onGeocodeError(error: Error): void {
    console.error('onGeocodeError', error);
    this.hintValue = error.message;
    this.cd.detectChanges();
  }

  private parseGeoHereResponse(geoResponse: any): any[] {
    if (!!geoResponse && !!geoResponse.response && !!geoResponse.response.view[0] && geoResponse.response.view.length > 0) {
      const parsedAddresses: any[] = [];
      if (!!geoResponse.response.view[0].result && geoResponse.response.view[0].result.length > 0) {
        geoResponse.response.view[0].result.forEach(found => {
          const address: any = found.location.address;
          if (!!address) {
            parsedAddresses.push({
              display: address.label
            });
          }
        });
        return parsedAddresses;
      }
    } else {
      return this.noAddress;
    }
  }

  public chooseHereAddress(i: number): void {
    if (!!this.geocoderResponse) {
      const result = this.geocoderResponse.response.view[0].result[i];

      const displayValue: string = result.location.address.street + ' ' + result.location.address.houseNumber;
      const zipcode: string = result.location.address.postalCode;

      if (!!result.location.displayPosition) {
        const coordinates: Point = {
          lat: result.location.displayPosition.latitude.toString(),
          lng: result.location.displayPosition.longitude.toString()
        };

        const output: GeocoderOutput = {
          coordinates,
          locationId: result.location.locationId,
          displayValue,
          zipcode
        };
        this.addressChosenFromGeocoder.emit(true);
        this.currentCoordinates = coordinates;
        this.geoControl.setValue(displayValue);
        this.chosenAddress.emit(output);
      } else {
        this.hintValue = 'Brakuje koordynatów w wybranym adresie!';
        console.error('geoRes: ', this.geocoderResponse);

        const output: GeocoderOutput = {
          coordinates: {
            lat: '',
            lng: ''
          },
          locationId: result.location.locationId,
          displayValue,
          zipcode
        };

        this.addressChosenFromGeocoder.emit(false);
        this.geoControl.setValue(displayValue);
        this.chosenAddress.emit(output);
      }
    }
  }

  public openSelectedCoordinatesInGmaps(): void {
    window.open(`https://www.google.com/maps/?q=${this.currentCoordinates.lat},${this.currentCoordinates.lng}`);
  }

  public clearInput(): void {
    this.initialAddress = '';
    this.geoControl.setValue('');
  }
}
