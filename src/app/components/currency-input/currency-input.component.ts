import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'currency-input',
  standalone: true,
  imports: [TuiInputNumberModule, TuiTextfieldControllerModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyInputComponent {}
