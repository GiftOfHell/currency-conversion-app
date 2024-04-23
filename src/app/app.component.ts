import { TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { CurrencyConversionComponent } from './pages/currency-conversion/currency-conversion.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CurrencyConversionComponent,
    TuiRootModule,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'currency-conversion-app';
}
