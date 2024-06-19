import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { LoginService } from './login.service';
import {Login} from "./login.model";
import {MatCheckbox} from "@angular/material/checkbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatInputModule,
    MatCheckbox,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    //password: new FormControl('', [Validators.required, Validators.minLength(6)]), //commented out for now
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  constructor(private fb: FormBuilder, private loginService: LoginService,
              private router: Router) { }
  loginRequestToSend: Login = new Login('', '', false);

  ngOnInit(): void {
    this.loginService.test();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      //password: ['', [Validators.required, Validators.minLength(6)]]
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }
  submitButton(): void {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;
      console.log(this.loginForm.value.username)
      console.log(this.loginForm.value.password)
      console.log(this.loginForm.value.rememberMe)
      this.loginRequestToSend.username = username;
      this.loginRequestToSend.password = password;
      this.loginRequestToSend.rememberMe = rememberMe;
    }
    this.loginService.login(this.loginRequestToSend).subscribe({
      next: (data) => {
        console.log(data);
        const token = data.jwt;
        console.log(token);
        if (this.loginRequestToSend.rememberMe) {
          localStorage.setItem('jwtToken', token);
        } else {
          sessionStorage.setItem('jwtToken', token);
        }
        this.router.navigate(['/home']).then(r => '/login');
      },
      error: (error) => {
        console.log(error);
      }
      })
  }

}
