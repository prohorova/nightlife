import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {}

  getIcon() {
    return this.isLanding() ?
      '../../assets/img/glass_light.svg' :
      '../../assets/img/glass_dark.svg';
  }

  getClasses() {
    if (!this.isLanding()) {
      return 'navbar navbar-light bg-faded'
    }
    return 'navbar';
  }

  isLanding() {
    return this.router.url === '/';
  }

  login() {
    this.auth.login().subscribe(() => {

    })
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {

  }

}
