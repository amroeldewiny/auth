import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../servies/auth-service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = "";

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getAuth();
    }
  }

  logout() {
    this.auth.logoutUser();
    this.router.navigate(['/']);
  }

  getAuth() {
    this.auth.getData('/api/user')
      .subscribe((res) => {
        console.log(res[1]);
        this.user = res[1];
      }, (error) => {
        console.log(error);
      })
  }

}
