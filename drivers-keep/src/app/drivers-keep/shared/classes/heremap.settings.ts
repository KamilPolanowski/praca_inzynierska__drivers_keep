import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HereConfig {
  public readonly hereMapsApiKey: H.service.Platform.Options = {
    'app_id': 'ruxewKiorXp7IaMhnwnq',
    'app_code': 'Xj7gMKBEwXNVxIccyiDACA',
    useHTTPS: true
  };
  public readonly hereRouteParams: H.service.ServiceParameters = {
    'mode': 'fastest;truck;traffic:disabled',
    'routeattributes': 'wp,sm,sh,lg,no,ri,sc',
    'legattributes': 'li',
    'routeLinkAttributes': 'tr,sh',
    'maneuverAttributes': 'ru,no,li',
    'truckrestrictionpenalty': 'soft',
    'height': '4.00',
    'width': '2.5',
    'length': '16.5',
    'limitedWeight': '40',
    'vehicletype': 'diesel,30.0',
    'metricsystem': 'metric',
    'excludeCountries': 'CHE'
  };
  public readonly hereTollParams: H.service.ServiceParameters = {
    'detail': '1',
    'driver_cost': '10',
    'vehicle_cost': '0.5',
    'currency': 'EUR',
    'tollVehicleType': '3',
    'trailerType': '2',
    'trailersCount': '1',
    'vehicleNumberAxles': '2',
    'trailerNumberAxles': '3',
    'hybrid': '0',
    'emissionType': '5',
    'height': '4.0m',
    'trailerHeight': '4.0m',
    'vehicleWeight': '24.0t',
    'limitedWeight': '40.0t',
    'disabledEquipped': '0',
    'minimalPollution': '0',
    'hov': '0',
    'length': '16.5m',
    'passengersCount': '1',
    'tiresCount': '10',
    'commercial': '0',
    'heightAbove1stAxle': '3m',
    'rollup': 'total,tollsys,country',
    'release': 'LATEST'
  }
}
