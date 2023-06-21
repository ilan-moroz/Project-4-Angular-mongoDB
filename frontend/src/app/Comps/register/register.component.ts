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
  city: string = '';
  street: string = '';
  firstName: string = '';
  lastName: string = '';

  onSub(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    } else {
      form.controls['idNumber'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['password'].markAsTouched();
      console.log('Form is not valid!');
    }
  }
}
