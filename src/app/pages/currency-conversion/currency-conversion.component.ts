import { Component } from '@angular/core';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../types/currency.types';
import { FrequencyService } from '../../services/frequency.service';

@Component({
  selector: 'currency-conversion',
  standalone: true,
  imports: [
    CurrencyInputComponent,
    CurrencySelectorComponent,
    DateSelectorComponent,
  ],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent {
  currencies: Currency[] = [];
  popularCurrencies: Currency[] = [];

  constructor(
    private currencyService: CurrencyService,
    private frequencyService: FrequencyService
  ) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((response) => {
      this.currencies = Object.entries(response.currencies).map(
        ([isoCode, currencyName]) => ({ isoCode, currencyName })
      );
      this.sortCurrencies();
    });
  }

  sortCurrencies(): void {
    const sortedCurrencies = [...this.currencies].sort((a, b) => {
      const frequencyA = this.frequencyService.getItemFrequency(a.isoCode);
      const frequencyB = this.frequencyService.getItemFrequency(b.isoCode);
      return frequencyB - frequencyA;
    });
    const popularCurrencies = sortedCurrencies
      .filter((currency) => {
        return this.frequencyService.getItemFrequency(currency.isoCode) > 0;
      })
      .slice(0, 3);
    this.popularCurrencies = popularCurrencies;
  }
}
