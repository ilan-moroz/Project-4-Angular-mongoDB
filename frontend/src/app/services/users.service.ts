import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  registerAction(user: User) {
    const api = `http://localhost:4000/api/v1/mongoStore/user/register`;
    return this.http.post<{ customer: User; token: string }>(api, user);
  }

  loginAction(email: string, password: string) {
    const api = `http://localhost:4000/api/v1/mongoStore/user/login`;
    const userCredentials = { email, password };
    return this.http.post<{
      user: { firstName: string; lastName: string };
      token: string;
    }>(api, userCredentials);
  }

  checkUserAction(email: string, idNumber: number): Observable<boolean> {
    const api = `http://localhost:4000/api/v1/mongoStore/user/checkEmailId/${email}/${idNumber}`;
    return this.http
      .get<{ exists: boolean }>(api)
      .pipe(map((response) => response.exists));
  }

  private userSubject: BehaviorSubject<{
    firstName: string;
    lastName: string;
  } | null> = new BehaviorSubject<{
    firstName: string;
    lastName: string;
  } | null>(null);
  public user = this.userSubject.asObservable();

  setUser(firstName: string, lastName: string): void {
    const user = { firstName, lastName };
    // Store the user object in the local storage
    localStorage.setItem('user', JSON.stringify(user));
    // Emit the new user object so all subscribers get the updated value
    this.userSubject.next(user);
  }

  getUser(): { firstName: string; lastName: string } | null {
    // Try to get the user object from the local storage
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
