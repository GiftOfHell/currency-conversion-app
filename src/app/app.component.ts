import { TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { CurrencyConversionComponent } from './pages/currency-conversion/currency-conversion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyConversionComponent, TuiRootModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'currency-conversion-app';
}
