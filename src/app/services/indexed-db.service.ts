import { Injectable } from '@angular/core';

export type Store<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    name: string;
    keyPath: keyof T;
  };

export type ReadStore<T> = {
  get: (key: string) => Promise<T | null>;
  getAll: () => Promise<T[]>;
};

export type WriteStore<T> = {
  add: (a: T) => Promise<boolean>;
};

export const migrations: Store[] = [
  {
    name: 'users-store',
    keyPath: 'username',
  },
];

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private name = 'currency-db';

  public async getReadAccess<T>(name: string): Promise<ReadStore<T>> {
    const db = await this.openDb();
    const store = db.transaction(name, 'readonly').objectStore(name);

    const get = (key: string): Promise<T | null> =>
      new Promise((resolve, reject) => {
        const request = store.get(key);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      });

    const getAll = (): Promise<T[]> =>
      new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      });

    return {
      get,
      getAll,
    };
  }

  public async getWriteAccess<T>(name: string): Promise<WriteStore<T>> {
    const db = await this.openDb();
    const store = db.transaction(name, 'readwrite').objectStore(name);

    const add = (a: T): Promise<boolean> =>
      new Promise((resolve, reject) => {
        const request = store.add(a);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(true);
        };
      });

    return {
      add,
    };
  }

  private openDb(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.name);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        migrations.forEach((m) => {
          const { name, keyPath } = m;

          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath });
          }
        });

        resolve(db);
      };
    });
  }
}
