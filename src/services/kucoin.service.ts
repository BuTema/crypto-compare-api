import fetch from 'node-fetch';
import { ExchangeInterface } from '../models/exchange.model';

class KucoinService implements ExchangeInterface {
  name: string;
  constructor() {
    this.name = 'Kucoin';
  }

  async fetchData(base: string, quote: string): Promise<number> {
    const response: any = await fetch(
      `https://api.kucoin.com/api/v1/mark-price/${base.toUpperCase()}-${quote.toUpperCase()}/current`,
    );
    const data = await response.json();
    if (data?.data?.value) {
      return data.data.value;
    }
    if (data.code === '415000') {
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
      return rate;
    }
    return 1 / rateInverse;
  }
}
export default KucoinService;
