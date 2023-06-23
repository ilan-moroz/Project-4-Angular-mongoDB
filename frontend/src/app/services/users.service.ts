import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUserAction(user: User) {
    const api = `http://localhost:4000/api/v1/mongoStore/user/addUser`;
    return this.http.post<{ customer: User; token: string }>(api, user);
  }

  checkUserAction(email: string, idNumber: number): Observable<boolean> {
    const api = `http://localhost:4000/api/v1/mongoStore/user/checkEmailId/${email}/${idNumber}`;
    return this.http
      .get<{ exists: boolean }>(api)
      .pipe(map((response) => response.exists));
  }
}
