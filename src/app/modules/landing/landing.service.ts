import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalFunctions } from '../common/global-functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private http: HttpClient, 
    private _globalFunctions: GlobalFunctions
  ) {}

  query(queryObj: any = {}): any {
    return this.http.post(environment.appURL + 'queries', queryObj, this._globalFunctions.getHeader());
  }
  getQueryByEmail(emailId: any = ''): any {
    return this.http.get(environment.appURL + 'queries?filters[email]=' + emailId + '&populate=*', this._globalFunctions.getHeader());
  }
  queryUpdate(updateId: any = '', queryObj: any = {}): any {
    return this.http.put(environment.appURL + 'queries/' + updateId, queryObj, this._globalFunctions.getHeader());
  }
  getIpAddress(): Observable<any> {
    return this.http.get(environment.appURL + 'get-ip', this._globalFunctions.getHeader());
  }
}
