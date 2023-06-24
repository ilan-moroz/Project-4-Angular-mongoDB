import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userSubscription: Subscription | undefined;

  constructor(
    private userService: UsersService,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe((user) => {
      if (user) {
        this.userName = `${user.firstName} ${user.lastName}`;
      }
    });
  }

  logout() {
    this.AuthService.logout();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
