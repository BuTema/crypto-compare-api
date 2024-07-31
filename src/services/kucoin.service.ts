import fetch from 'node-fetch';
import { ExchangeInterface } from '../models/exchange.model';

class KucoinService implements ExchangeInterface {
  name: string;
  constructor() {
    this.name = 'Kucoin';
  }

  async fetchData(base: string, quote: string): Promise<number> {
    const response: any = await fetch(
      `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${base.toUpperCase()}-${quote.toUpperCase()}`,
    );
    const data = await response.json();
    if (data?.data?.price) {
      return parseFloat(data.data.price);
    }
    if (data.data === null) {
      return NaN;
    }
    throw new Error('Failed to fetch kucoin exchange rate');
  }

  async getRate(base: string, quote: string): Promise<number> {
    const [rate, rateInverse] = await Promise.all([
      this.fetchData(base, quote),
      this.fetchData(quote, base),
    ]);
    if (!isNaN(rate)) {
      console.log('🚀 ~ Token output KucoinService :', rate);
      return rate;
    }
    console.log('🚀 ~ Token output KucoinService :', 1 / rateInverse);
    return 1 / rateInverse;
  }
}
export default KucoinService;
