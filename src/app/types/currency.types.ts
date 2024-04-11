export type Currency = { isoCode: string; currencyName: string };

export type CurrencyResponse = {
  currencies: Record<string, string>;
  status: string;
};

export type CurrencyConversionResponse = {
  status: string;
  updated_date: string;
  base_currency_code: string;
  amount: number;
  base_currency_name: string;
  rates: {
    [key: string]: {
      currency_name: string;
      rate: string;
      rate_for_amount: string;
    };
  };
};

export type CurrencyAmountChangeEvent = {
  amount: number;
  isoCode: string;
};
