import { TuiStringHandler } from '@taiga-ui/cdk';
import { Currency } from '../types/currency.types';

export const stringifyCurrency: TuiStringHandler<Currency> = (
  currency: Currency
) => currency.isoCode + ' ' + currency.currencyName;

export const matchCurrencyString = (
  currency: Currency,
  search: string
): boolean => {
  return (currency.isoCode + ' ' + currency.currencyName)
    .toLowerCase()
    .includes(search.toLowerCase());
};
