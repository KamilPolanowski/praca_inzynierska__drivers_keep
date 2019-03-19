import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerSettings {
  public readonly apiServer = 'https://api.erp.adar.pl';
  public readonly rcpSocketAdress = 'wss://rcp.ws.adar.pl';
  // public readonly mockJsonServer = 'http://localhost:3000';
  public readonly mockJsonServer = 'http://jsonplaceholder.typicode.com';
  public readonly apiPath = '/';
  public readonly apiUrl = this.apiServer + this.apiPath;
  public readonly mockUrl = this.mockJsonServer + this.apiPath;
}
