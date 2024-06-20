import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Register} from "./register.model";
import {Router} from "@angular/router";
import { RegisterService} from "./register.service";

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
    name: new FormControl('', [Validators.required]),
    //password: new FormControl('', [Validators.required, Validators.minLength(6)]), //commented out for now
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })
  private registerRequestToSend: Register = new Register(0, ['ROLE_USER'], '', '', '', '', '', '');

  constructor(private router: Router,
              private registerService: RegisterService) {
  }


  ngOnInit(): void {
  }

  submitButton(): void {
    if (this.registerForm.valid) {
      const { name, surname, username, email, password, confirmPassword } = this.registerForm.value;
      this.registerRequestToSend.name = name;
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
    this.router.navigate(['/home']);
  }
}
