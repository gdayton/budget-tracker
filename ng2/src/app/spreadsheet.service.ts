import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpreadsheetService {
  private apiUrl;
  constructor(private http: Http) { 
    this.apiUrl = "http://45.79.71.178:81";
  }

  public getDebt(id: string): Observable<any> {
    var apiCall = this.apiUrl + "/debt?id=" + id;
    return this.http.get(apiCall);
  }

  public getConf(id: string): Observable<any> {
    var apiCall = this.apiUrl + "/conf?id=" + id;
    return this.http.get(apiCall);
  }

  public getValues(id: string): Observable<any> {
    var apiCall = this.apiUrl + "/values?id=" + id;
    return this.http.get(apiCall);
  }

  public getCurrentDay(): Observable<any> {
    var apiCall = this.apiUrl + "/currentday";
    return this.http.get(apiCall);
  }

}
