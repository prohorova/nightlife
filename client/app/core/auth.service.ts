import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  userManager: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user: Observable<any>;

  constructor(private http: Http, private router: Router) {
    this.user = this.userManager.asObservable();
  }

  getUser() {
    return this.http.get(`${environment.baseUrl}/user`)
      .map(res => res.json())
      .subscribe(user => {
        this.userManager.next(user);
      })
  }

  getLoginLink() {
    return `/auth/google?path=${this.router.url}`;
  }

  login() {
    window.location.assign(this.getLoginLink());
  }

  logout() {
    return this.http.get(`${environment.baseUrl}/logout`)
      .map(res => res.json())
      .subscribe(
        () => {
          this.userManager.next(false);
        },
        err => {
          console.log(err);
        })
  }

}
