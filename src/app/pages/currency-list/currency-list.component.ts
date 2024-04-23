import { Component, OnInit } from '@angular/core';
import { CurrencyConversionService } from '../../services/currency-conversion.service';
import { Currency } from '../../types/currency.types';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { matchCurrencyString } from '../../utils/currency.utils';

@Component({
  selector: 'currency-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss',
})
export class CurrencyListComponent implements OnInit {
  conversions: Currency[] = [];
  filteredConversions: Currency[] = [];
  searchString: string = '';
  searchSubject = new Subject<void>();

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
        this.filteredConversions = this.conversions.slice();
      });
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterConversions();
    });
  }

  filterConversions(): void {
    this.filteredConversions = this.conversions.filter((currency) =>
      matchCurrencyString(currency, this.searchString)
    );
  }

  onSearchInput(): void {
    this.searchSubject.next();
  }
}
