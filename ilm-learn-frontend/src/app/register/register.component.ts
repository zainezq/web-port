import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {Register} from './register.model';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    //password: new FormControl('', [Validators.required, Validators.minLength(6)]), //commented out for now
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })
  private registerRequestToSend: Register = new Register(0, ['ROLE_USER'], '', '', '', '', '', '', '');

  constructor(private router: Router,
              private registerService: RegisterService) {
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, surname, username, email, password, confirmPassword } = this.registerForm.value;
      this.registerRequestToSend.firstName = firstName;
      this.registerRequestToSend.surname = surname;
      this.registerRequestToSend.username = username;
      this.registerRequestToSend.email = email;
      this.registerRequestToSend.password = password;
      this.registerRequestToSend.confirmPassword = confirmPassword;

      console.log(this.registerRequestToSend);
    }
    this.registerService.register(this.registerRequestToSend).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    })
    //this.router.navigate(['/home']);
  }

}
