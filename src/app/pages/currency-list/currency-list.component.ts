import { Component, OnInit } from '@angular/core';
import { CurrencyConversionService } from '../../services/currency-conversion.service';
import { Currency } from '../../types/currency.types';
import { NgFor } from '@angular/common';

@Component({
  selector: 'currency-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss',
})
export class CurrencyListComponent implements OnInit {
  conversions: Currency[] = [];

  constructor(private currencyConversionService: CurrencyConversionService) {}

  ngOnInit(): void {
    this.currencyConversionService
      .getCurrencyConversionsBYN()
      .subscribe((response) => {
        this.conversions = Object.entries(response.rates).map(
          ([isoCode, currencyInfo]) => ({
            isoCode,
            currencyName: currencyInfo.currency_name,
            rate: parseFloat(currencyInfo.rate),
          })
        );
      });
  }
}
