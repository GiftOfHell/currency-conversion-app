import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CurrencyAmountChangeEvent } from '../../types/currency.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'currency-input',
  standalone: true,
  imports: [FormsModule, TuiInputNumberModule, TuiTextfieldControllerModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyInputComponent {
  @Input() isoCode!: string;
  @Input() currencyAmount: number | null = null;
  @Output() currencyAmountChange =
    new EventEmitter<CurrencyAmountChangeEvent>();

  onCurrencyAmountInput(amount: number) {
    this.currencyAmountChange.emit({ amount, isoCode: this.isoCode });
  }
}
