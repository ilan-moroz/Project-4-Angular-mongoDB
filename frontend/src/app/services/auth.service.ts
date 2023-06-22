import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = false;

  constructor() {}

  // set user logged in status or logged out
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  // check if user is logged in
  get isLoggedIn() {
    return this.loggedInStatus;
  }
}
