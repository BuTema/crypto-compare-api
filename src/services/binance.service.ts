import fetch from 'node-fetch';

import { ExchangeInterface } from '../models/exchange.model';

class BinanceService implements ExchangeInterface {
  name: string;
  constructor() {
    this.name = 'Binance';
  }

  async getExchangeRate(base: string, quote: string): Promise<number> {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${base.toUpperCase()}${quote.toUpperCase()}`,
    );
    const data: any = await response.json();
    if (data.price) {
      return parseFloat(data.price);
    }
    if (data?.code === -1121) {
      return NaN;
    }
    throw new Error('Failed to fetch binance exchange rate');
  }

  async getRate(base: string, quote: string): Promise<number> {
    const [rate, rateInverse] = await Promise.all([
      this.getExchangeRate(base, quote),
      this.getExchangeRate(quote, base),
    ]);
    if (!isNaN(rate)) {
      return rate;
    }
    return 1 / rateInverse;
  }
}
export default BinanceService;
