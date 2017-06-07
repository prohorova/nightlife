import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: any;
  url: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

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

  getUser() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    })
  }

  isLanding() {
    return this.router.url === '/';
  }

}
