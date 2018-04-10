import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../servies/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    "email": new FormControl('amro.eldewiny@it4itservices.com', Validators.required),
    "password": new FormControl('eldewiny79', Validators.required),
    //"email": new FormControl('', Validators.required),
    //"password": new FormControl('', Validators.required),
  });

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value);
    this.auth.loginUser(this.loginForm.value);
  }

  back() {
    this.router.navigate(['/']);
  }

}
