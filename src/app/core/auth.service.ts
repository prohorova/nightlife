import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) {}

  getUser() {
    return this.http.get(`${environment.baseUrl}/user`)
      .map(res => res.json())
  }

  getLoginLink() {
    return `/auth/google?path=${this.router.url}`;
  }

  getLogoutLink() {
    return `/logout?path=${this.router.url}`;
  }

  login() {
    window.location.assign(this.getLoginLink());
  }

}
