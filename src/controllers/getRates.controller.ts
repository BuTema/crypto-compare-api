import { Response, Router } from 'express';
import { getRates } from '../services/exchange.service';
import { GetRatesDTOInterface, GetRatesInterface } from 'src/models/getRates.model';

const router = Router();

router.get('/', async (req: { query: GetRatesDTOInterface }, res: Response) => {
  const { baseCurrency, quoteCurrency } = req.query;
  console.log('🚀 GET_RATES ENDPOINT Got from user:', { baseCurrency, quoteCurrency });
  const rates: GetRatesInterface[] | String = await getRates(baseCurrency, quoteCurrency);
  if (typeof rates !== 'string') {
    console.log('🚀 GET_RATES ENDPOINT Sending rates for user:', rates);
  }
  res.json(rates);
});

export default router;
