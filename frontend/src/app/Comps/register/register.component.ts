import { CitiesService } from './../../services/cities.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private CitiesService: CitiesService) {}
  ngOnInit() {
    this.CitiesService.getCitiesAction().subscribe((cities) => {
      this.cityNames = this.cityNames.concat(cities);
      this.cityNames = this.cityNames.filter((city) => city !== ' ');
    });
  }

  onSub(form: NgForm) {
    if (form.valid) {
      this.step += 1;
      this.step1Submitted = true;
      console.log(form.value);
    } else {
      form.controls['idNumber'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['password'].markAsTouched();
      form.controls['confirmPassword'].markAsTouched();
      console.log('Form is not valid!');
    }
  }
}
