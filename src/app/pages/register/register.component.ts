import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  get username() {
    return this.registrationForm.controls['username'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  get confirmPassword() {
    return this.registrationForm.controls['confirmPassword'];
  }

  get isPasswordMismatch() {
    return (
      this.registrationForm.errors?.['passwordMismatch'] &&
      this.confirmPassword.valid &&
      this.password.valid
    );
  }

  async registerUser() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    const username = this.registrationForm.value.username;
    const password = this.registrationForm.value.password;

    try {
      const registered = await this.authService.registerUser(
        username,
        password
      );
      if (registered) {
        this.registrationForm.reset();
        this.router.navigate(['login']);
      } else {
        this.username.setErrors({ taken: true });
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
}
