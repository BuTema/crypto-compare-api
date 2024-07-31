export interface ExchangeInterface {
  name: string;
  getRate: (base: string, quote: string) => Promise<number>;
}
