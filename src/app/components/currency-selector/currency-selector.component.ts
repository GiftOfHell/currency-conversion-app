import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { stringifyCurrency } from '../../utils/currency.utils';
import { Currency } from '../../types/currency.types';
import { ImgFallbackDirective } from '../../directives/img-fallback.directive';

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
    ImgFallbackDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiItemsHandlersProvider({ stringify: stringifyCurrency })],
})
export class CurrencySelectorComponent {
  @Input() items: Currency[][] = [];

  selectedCurrency!: Currency;

  labels = ['Popular', 'All'];

  getUrl(isoCode: string): string {
    return `https://flagcdn.com/w40/${isoCode.slice(0, 2).toLowerCase()}.png`;
  }
}
