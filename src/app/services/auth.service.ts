import { Injectable } from '@angular/core';
import { User } from '../types/user.types';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUsers(): User[] {
    const usersJson = localStorage.getItem('users') || '[]';
    return JSON.parse(usersJson);
  }

  getUserByUsername(username: string): User | null {
    const users = this.getUsers();
    return users.find((user) => user.username === username) || null;
  }

  createUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  isUsernameTaken(username: string): boolean {
    const users = this.getUsers();
    return users.some((user) => user.username === username);
  }

  isUserAuthorized(): boolean {
    return !!sessionStorage.getItem('username');
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    const user = this.getUserByUsername(username);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        sessionStorage.setItem('username', username);
        return true;
      }
    }
    return false;
  }

  async registerUser(username: string, password: string): Promise<boolean> {
    const isUsernameTaken = this.isUsernameTaken(username);
    if (isUsernameTaken) {
      return false;
    } else {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const user: User = { username, password: hash };
      this.createUser(user);
      return true;
    }
  }
}
