import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CurrencyResponse } from '../types/currency.types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl: string = `${environment.apiUrl}/list?api_key=${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(this.baseUrl);
  }
}
