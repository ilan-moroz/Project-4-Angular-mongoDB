import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';
  private tokenExpiredSubject = new BehaviorSubject<boolean>(false);
  tokenExpired = this.tokenExpiredSubject.asObservable();
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    setInterval(() => this.checkTokenExpiration(), 1000 * 60); // Check every minute
  }
  // set user logged in status
  setLoggedIn(value: boolean, token: string | null = null) {
    if (value && token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      this.clearUserDataAndToken();
    }
    this.loggedInSubject.next(value);
  }

  // get stored token
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const token = this.token;
    if (!token) return true;

    const decoded: any = jwt_decode(token);
    const exp = decoded.exp;

    if (!exp) {
      return true;
    }

    const current_time = Date.now() / 1000;
    if (exp < current_time) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  private checkTokenExpiration() {
    if (this.isLoggedIn()) {
      const tokenExpired = this.isTokenExpired();
      if (tokenExpired) {
        this.clearUserDataAndToken();
      }
      this.tokenExpiredSubject.next(tokenExpired);
    }
  }

  logout() {
    this.clearUserDataAndToken();
  }

  private clearUserDataAndToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
