import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { CitiesService } from '../../services/cities.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  idNumber?: number;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  city: string | null = null;
  street: string = '';
  firstName: string = '';
  lastName: string = '';
  step = 1;
  step1Submitted = false;
  cityNames: string[] = [];

  constructor(
    private CitiesService: CitiesService,
    private UsersService: UsersService,
    private router: Router,
    private AuthService: AuthService
  ) {}
  ngOnInit() {
    this.CitiesService.getCitiesAction().subscribe((cities: string[]) => {
      const lowerCaseCities = cities.map((city) => city.toLowerCase());
      this.cityNames = this.cityNames.concat(lowerCaseCities);
      this.cityNames = this.cityNames.filter((city) => city !== ' ');
    });
  }

  onSub(form: NgForm) {
    if (form.valid) {
      this.step += 1;
      this.step1Submitted = true;
    } else {
      form.controls['idNumber'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['password'].markAsTouched();
      form.controls['confirmPassword'].markAsTouched();
      console.log('Form is not valid!');
    }
  }

  onSub2(form2: NgForm) {
    if (form2.valid) {
      const newUser: User = new User(
        this.firstName,
        this.lastName,
        this.email,
        this.idNumber!,
        this.password,
        this.city!,
        this.street,
        'user'
      );
      this.UsersService.addUserAction(newUser).subscribe(
        (response) => {
          console.log('new user added', response);
          this.AuthService.setLoggedIn(true, response.token);
          this.router.navigate(['']);
        },
        (error) => console.log('Failed to add user: ', error)
      );
      this.AuthService.setLoggedIn(true);
    } else {
      form2.controls['city'].markAsTouched();
      form2.controls['street'].markAsTouched();
      form2.controls['firstName'].markAsTouched();
      form2.controls['lastName'].markAsTouched();
    }
  }
}
