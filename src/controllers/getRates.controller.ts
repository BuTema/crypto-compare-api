import { Response, Router } from 'express';
import { getRates } from '../services/exchange.service';
import { GetRatesDTOInterface, GetRatesInterface } from 'src/models/getRates.model';

const router = Router();

router.get('/', async (req: { query: GetRatesDTOInterface }, res: Response) => {
  console.log('🚀 ~ router.get ~ req:', req);
  const { baseCurrency, quoteCurrency } = req.query;
  const rates: GetRatesInterface[] | String = await getRates(baseCurrency, quoteCurrency);
  res.json(rates);
});

export default router;
