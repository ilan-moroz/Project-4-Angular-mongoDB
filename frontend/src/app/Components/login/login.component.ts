import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    if (this.AuthService.isTokenExpired()) {
      console.log('token is expired');
    } else {
      this.loggedIn = true;
      console.log('token is valid');
    }
  }
}
