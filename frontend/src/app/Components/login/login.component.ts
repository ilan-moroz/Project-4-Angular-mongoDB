import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    if (this.AuthService.isTokenExpired()) {
      console.log('token is expired');
    } else {
      this.loggedIn = true;
      console.log('token is valid');
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
