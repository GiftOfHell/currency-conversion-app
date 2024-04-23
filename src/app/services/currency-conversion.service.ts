import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CurrencyConversionResponse } from '../types/currency.types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionService {
  constructor(private http: HttpClient) {}

  convertCurrency(
    conversionDate: Date,
    isoCodeFrom: string,
    isoCodeTo: string,
    currencyAmount: number
  ): Observable<CurrencyConversionResponse> {
    const utcDate = new Date(
      Date.UTC(
        conversionDate.getFullYear(),
        conversionDate.getMonth(),
        conversionDate.getDate()
      )
    );
    const params = new URLSearchParams({
      api_key: environment.apiKey,
      from: isoCodeFrom,
      to: isoCodeTo,
      amount: currencyAmount.toString(),
      format: 'json',
    });
    const baseUrl = `${environment.apiUrl}/historical/${
      utcDate.toISOString().split('T')[0]
    }?${params.toString()}`;
    return this.http.get<CurrencyConversionResponse>(baseUrl);
  }

  getCurrencyConversionsBYN() {
    const params = new URLSearchParams({
      api_key: environment.apiKey,
      from: 'BYN',
      format: 'json',
    });
    const baseUrl = `${environment.apiUrl}/convert?${params.toString()}`;
    return this.http.get<CurrencyConversionResponse>(baseUrl);
  }
}
