import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class SearchService {

  location: string;
  bars: any[];

  constructor(private http: Http) { }

  fetchBars(location: string): Observable<any> {
    const url = `${environment.baseUrl}/search?location=${location}`;
    return this.http.get(url)
      .map(res => res.json())
      .do(bars => {
        this.location = location;
        this.bars = bars;
      })
  }

  getBars() {
    return this.bars;
  }

  getLocation() {
    return this.location;
  }

}
