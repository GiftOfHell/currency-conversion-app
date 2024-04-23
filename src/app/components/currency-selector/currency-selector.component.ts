import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { stringifyCurrency } from '../../utils/currency.utils';
import { Currency } from '../../types/currency.types';
import { ImgFallbackDirective } from '../../directives/img-fallback.directive';
import { FrequencyService } from '../../services/frequency.service';
import { FlagIsoCode } from '../../pipes/iso-code.pipe';
import { matchCurrencyString } from '../../utils/currency.utils';

@Component({
  standalone: true,
  selector: 'currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss',
  imports: [
    FormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiTextfieldControllerModule,
    ImgFallbackDirective,
    FlagIsoCode,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiItemsHandlersProvider({ stringify: stringifyCurrency })],
})
export class CurrencySelectorComponent {
  @Input() items: Currency[][] = [];
  @Output() currencyChange = new EventEmitter<string>();

  selectedCurrency!: Currency;

  labels = ['Popular', 'All'];
  matchCurrencyString = matchCurrencyString;

  constructor(private frequencyService: FrequencyService) {}

  onCurrencyChange(newCurrency: Currency): void {
    this.frequencyService.incrementItemFrequency(newCurrency.isoCode);
    this.currencyChange.emit(newCurrency.isoCode);
  }
}
