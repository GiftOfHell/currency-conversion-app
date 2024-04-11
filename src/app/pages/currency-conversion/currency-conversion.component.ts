import { Component } from '@angular/core';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../types/currency.types';

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

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((response) => {
      this.currencies = Object.entries(response.currencies).map(
        ([isoCode, currencyName]) => ({ isoCode, currencyName })
      );
    });
  }
}
