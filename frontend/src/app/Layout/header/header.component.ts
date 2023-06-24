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
  loggedIn: boolean = false;
  loggedSubscription!: Subscription;

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
    this.loggedSubscription = this.AuthService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.loggedIn = isLoggedIn)
    );
  }

  logout() {
    this.AuthService.logout();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loggedSubscription) {
      this.loggedSubscription.unsubscribe();
    }
  }
}
