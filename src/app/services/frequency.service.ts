import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrequencyService {
  private readonly STORAGE_KEY = 'itemFrequency';

  constructor() {}

  getItemFrequency(itemKey: string): number {
    const itemFrequency = localStorage.getItem(
      `${this.STORAGE_KEY}_${itemKey}`
    );
    return itemFrequency ? parseInt(itemFrequency, 10) : 0;
  }

  incrementItemFrequency(itemKey: string): void {
    const currentFrequency = this.getItemFrequency(itemKey);
    localStorage.setItem(
      `${this.STORAGE_KEY}_${itemKey}`,
      (currentFrequency + 1).toString()
    );
  }

  decrementItemFrequency(itemKey: string): void {
    const currentFrequency = this.getItemFrequency(itemKey);
    if (currentFrequency > 0) {
      localStorage.setItem(
        `${this.STORAGE_KEY}_${itemKey}`,
        (currentFrequency - 1).toString()
      );
    }
  }
}
