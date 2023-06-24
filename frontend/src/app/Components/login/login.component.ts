import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private UsersService: UsersService,
    private AuthService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.AuthService.isTokenExpired()) {
      console.log('token is expired');
    } else {
      this.loggedIn = true;
      console.log('token is valid');
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSub() {
    if (this.loginForm.valid) {
      const emailValue = this.loginForm.controls.email.value;
      const passwordValue = this.loginForm.controls.password.value;
      if (emailValue !== null && passwordValue !== null) {
        this.UsersService.loginAction(emailValue, passwordValue).subscribe(
          (response) => {
            this.AuthService.setLoggedIn(true, response.token);
            this.UsersService.setUser(
              response.user.firstName,
              response.user.lastName
            );
            this.loggedIn = true;
          },
          (error) => {
            // This code will be executed if an error occurs during the HTTP request
            if (error.status === 400) {
              this.snackBar.open(
                'Incorrect email or password. Please verify your details and try again.',
                'Close',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                }
              );
            }
          }
        );
      }
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Invalid form');
    }
  }
}
