import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { stringifyCurrency } from '../../utils/currency.utils';
import { Currency } from '../../types/currency.types';

@Component({
  standalone: true,
  selector: 'currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss',
  imports: [
    FormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiItemsHandlersProvider({ stringify: stringifyCurrency })],
})
export class CurrencySelectorComponent {
  items = [
    [
      { isoCode: 'USD', currencyName: 'Dollar' },
      { isoCode: 'BYN', currencyName: 'Rubble' },
    ],
    [
      { isoCode: 'BYN', currencyName: 'Rubble' },
      { isoCode: 'USD', currencyName: 'Dollar' },
    ],
  ];
  imageSrc = '../../../assets/white-flag.jpg';

  selectedCurrency!: Currency;

  labels = ['Popular', 'All'];
}
