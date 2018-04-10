import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../servies/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    "name": new FormControl('', Validators.required),
    "email": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required),
    "password_confirmation": new FormControl('', Validators.required),
  });
  token: any = "";

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm.value.password != this.registerForm.value.password_confirmation) {
      console.log('password confirmation did\'t match');
    } else {
      this.auth.registerUser(this.registerForm.value);
    }
  }

  back() {
    this.router.navigate(['/']);
  }

}
