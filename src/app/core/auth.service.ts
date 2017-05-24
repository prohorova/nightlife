import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  user: any;

  constructor(private http: Http) { }

  login() {
    return this.http.get(`${environment.baseUrl}/auth/google`)
      .map(res => res.json())
      .do((user) => {
        this.user = user;
      })
  }

  isLoggedIn() {
    return !!this.user;
  }

}
