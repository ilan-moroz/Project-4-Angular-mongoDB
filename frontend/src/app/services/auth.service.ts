import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {}

  // set user logged in status or logged out
  setLoggedIn(value: boolean, token: string | null = null) {
    if (value && token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // check if user is logged in
  get isLoggedIn() {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  // get stored token
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
