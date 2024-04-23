import { Routes } from '@angular/router';
import { CurrencyConversionComponent } from './pages/currency-conversion/currency-conversion.component';
import { CurrencyListComponent } from './pages/currency-list/currency-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'conversion',
    component: CurrencyConversionComponent,
  },
  {
    path: 'currency-list',
    component: CurrencyListComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
