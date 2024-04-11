export type Currency = { isoCode: string; currencyName: string };

export type CurrencyResponse = {
  currencies: Record<string, string>;
  status: string;
};
