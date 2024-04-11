import { Component, Inject } from '@angular/core';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';
import { CurrencyService } from '../../services/currency.service';
import { FrequencyService } from '../../services/frequency.service';
import { CurrencyConversionService } from '../../services/currency-conversion.service';
import { TuiDialogModule, TuiDialogService } from '@taiga-ui/core';
import {
  Currency,
  CurrencyAmountChangeEvent,
} from '../../types/currency.types';

@Component({
  selector: 'currency-conversion',
  standalone: true,
  imports: [
    CurrencyInputComponent,
    CurrencySelectorComponent,
    DateSelectorComponent,
    TuiDialogModule,
  ],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent {
  currencies: Currency[] = [];
  popularCurrencies: Currency[] = [];

  conversionDate = new Date();
  isoCodeLeft!: string;
  isoCodeRight!: string;
  currencyAmountLeft: number | null = null;
  currencyAmountRight: number | null = null;
  isoCodeFrom!: string;

  constructor(
    private currencyService: CurrencyService,
    private frequencyService: FrequencyService,
    private currencyConversionService: CurrencyConversionService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((response) => {
      this.currencies = Object.entries(response.currencies).map(
        ([isoCode, currencyName]) => ({ isoCode, currencyName })
      );
      this.sortCurrencies();
    });
  }

  setConversionDate(date: Date): void {
    this.conversionDate = date;
    this.onCurrencyConversion();
  }

  setIsoCodeLeft(isoCode: string): void {
    this.isoCodeLeft = isoCode;
    this.isoCodeFrom = isoCode;
    this.onCurrencyConversion();
    this.sortCurrencies();
  }

  setIsoCodeRight(isoCode: string): void {
    this.isoCodeRight = isoCode;
    this.onCurrencyConversion();
    this.sortCurrencies();
  }

  setCurrencyAmountLeft({ amount, isoCode }: CurrencyAmountChangeEvent): void {
    this.currencyAmountLeft = amount;
    this.isoCodeFrom = isoCode;
    this.onCurrencyConversion();
  }

  setCurrencyAmountRight({ amount, isoCode }: CurrencyAmountChangeEvent): void {
    this.currencyAmountRight = amount;
    this.isoCodeFrom = isoCode;
    this.onCurrencyConversion();
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

  onCurrencyConversion(): void {
    const isoCodeTo =
      this.isoCodeFrom === this.isoCodeLeft
        ? this.isoCodeRight
        : this.isoCodeLeft;
    const currencyAmount =
      this.isoCodeFrom === this.isoCodeLeft
        ? this.currencyAmountLeft
        : this.currencyAmountRight;
    if (currencyAmount !== null && this.isoCodeFrom && isoCodeTo) {
      this.currencyConversionService
        .convertCurrency(
          this.conversionDate,
          this.isoCodeFrom,
          isoCodeTo,
          currencyAmount
        )
        .subscribe({
          next: (response) => {
            const value = parseFloat(response.rates[isoCodeTo].rate_for_amount);
            if (this.isoCodeFrom === this.isoCodeLeft) {
              this.currencyAmountRight = value;
            } else {
              this.currencyAmountLeft = value;
            }
          },
          error: (error) => {
            this.showDialog(error.error.error.message);
          },
        });
    }
  }

  showDialog(errorMessage: string): void {
    this.dialogs.open(errorMessage, { label: 'Error', size: 's' }).subscribe();
  }
}
