import { Injectable } from '@angular/core';
import { User } from '../types/user.types';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): User[] {
    const usersJson = localStorage.getItem('users') || '[]';
    return JSON.parse(usersJson);
  }

  isUsernameTaken(username: string): boolean {
    const users = this.getUsers();
    return users.some((user) => user.username === username);
  }

  createUser(username: string, password: string): void {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      const user: User = { username, password: hash };
      const users = this.getUsers();
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    });
  }
}
