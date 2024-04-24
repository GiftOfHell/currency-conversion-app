import { Injectable } from '@angular/core';
import { User } from '../types/user.types';
import * as bcrypt from 'bcryptjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dbName = 'users-store';

  constructor(private indexedDbService: IndexedDbService) {}

  async getUsers(): Promise<User[]> {
    const readStore = await this.indexedDbService.getReadAccess<User>(
      this.dbName
    );
    return await readStore.getAll();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const readStore = await this.indexedDbService.getReadAccess<User>(
      this.dbName
    );
    return await readStore.get(username);
  }

  async createUser(user: User): Promise<void> {
    const writeStore = await this.indexedDbService.getWriteAccess<User>(
      this.dbName
    );
    await writeStore.add(user);
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    return !!user;
  }

  isUserAuthorized(): boolean {
    return !!sessionStorage.getItem('username');
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
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
    const isUsernameTaken = await this.isUsernameTaken(username);
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
