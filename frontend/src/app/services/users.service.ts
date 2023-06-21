import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUserAction(user: User) {
    const api = `http://localhost:4000/api/v1/mongoStore/user/addUser`;
    return this.http.post(api, user);
  }
}
