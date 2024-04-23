import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { username, password } = this.loginForm.value;
    const user = this.userService.getUserByUsername(username);

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return;
        }
        if (result) {
          sessionStorage.setItem('username', username);
          this.router.navigate(['/currency-list']);
        } else {
          this.password.setErrors({ incorrectPassword: true });
        }
      });
    } else {
      this.username.setErrors({ incorrectUsername: true });
    }
  }
}
