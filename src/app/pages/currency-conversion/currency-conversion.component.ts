import { Component } from '@angular/core';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';

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
export class CurrencyConversionComponent {}
