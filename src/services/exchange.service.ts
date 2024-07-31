import { GetRatesInterface } from 'src/models/getRates.model';
import { EstimateInterface } from 'src/models/estimate.model';
import tokens from '../models/tokens.model';
import BinanceService from './binance.service';
import KucoinService from './kucoin.service';
import UniswapService from './uniswap.service';

const exchanges = [
  new UniswapService(),
  new BinanceService(),
  new KucoinService(),
  //any new service
];

export async function getBestExchange(
  inputAmount: number,
  inputCurrency: string,
  outputCurrency: string,
): Promise<EstimateInterface | String> {
  const rates = await getRates(inputCurrency, outputCurrency);

  if (!Array.isArray(rates)) {
    return 'Unsupported currency';
  }

  const maxRate = rates.reduce((acc, curr) => {
    return acc.exchangeRate > curr.exchangeRate ? acc : curr;
  }, rates[0]);

  return {
    exchangeName: maxRate.exchangeName,
    outputAmount: maxRate.exchangeRate * inputAmount,
  };
}

function checkCurrency(currencyList: string[]): string[] {
  const tokenSymbols = tokens.map(token => token.symbol);
  const unsupported = currencyList.filter(curr => !tokenSymbols.includes(curr));
  return unsupported;
}

export async function getRates(
  baseCurrency: string,
  quoteCurrency: string,
): Promise<GetRatesInterface[] | String> {
  const unsupported = checkCurrency([baseCurrency, quoteCurrency]);
  if (unsupported.length) {
    return `Unsupported currency ${unsupported.join(', ')}`;
  }

  if (baseCurrency === quoteCurrency) {
    return exchanges.map(exchange => ({
      exchangeName: exchange.name,
      exchangeRate: 1,
    }));
  }

  const rates = await Promise.all(
    exchanges.map(exchange => exchange.getRate(baseCurrency, quoteCurrency)),
  );

  return exchanges.map((exchange, index) => ({
    exchangeName: exchange.name,
    exchangeRate: rates[index],
  }));
}
