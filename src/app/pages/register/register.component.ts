import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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

  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    const username = this.registrationForm.value.username;
    const password = this.registrationForm.value.password;

    const isUsernameTaken = this.userService.isUsernameTaken(username);
    if (isUsernameTaken) {
      this.username.setErrors({ taken: true });
    } else {
      this.userService.createUser(username, password);

      this.registrationForm.reset();
      this.router.navigate(['login']);
    }
  }
}
