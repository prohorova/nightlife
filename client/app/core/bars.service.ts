import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class BarsService {

  constructor(private http: Http) { }

  fetchBars(location: string): Observable<any> {
    const url = `${environment.baseUrl}/search?location=${location}`;
    return this.http.get(url)
      .map(res => res.json())
      .do(bars => {
        sessionStorage.setItem('location', location);
        sessionStorage.setItem('bars', JSON.stringify(bars));
      })
  }

  go(barId: string) {
    const url = `${environment.baseUrl}/go/${barId}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  getBars() {
    return JSON.parse(sessionStorage.getItem('bars') || '[]');
  }

  getLocation() {
    return sessionStorage.getItem('location');
  }

}
