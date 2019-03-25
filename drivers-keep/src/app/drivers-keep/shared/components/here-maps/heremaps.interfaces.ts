export interface Point {
  lat: string;
  lng: string;
}

export interface GeocoderOutput {
  coordinates: Point;
  locationId: string;
  displayValue: string;
  zipcode: string;
}
