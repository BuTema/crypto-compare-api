import { Response, Router } from 'express';
import { getBestExchange } from '../services/exchange.service';
import { EstimateDTOInterface, EstimateInterface } from '../models/estimate.model';

const router = Router();

router.get('/', async (req: { query: EstimateDTOInterface }, res: Response) => {
  const { inputAmount, inputCurrency, outputCurrency } = req.query;
  console.log('🚀 EXCHANGE ENDPOINT Got from user:', {
    inputAmount,
    inputCurrency,
    outputCurrency,
  });
  const result: EstimateInterface | String = await getBestExchange(
    inputAmount,
    inputCurrency,
    outputCurrency,
  );
  if (typeof result !== 'string') {
    console.log('🚀 EXCHANGE ENDPOINT Sending best exchange for user:', result);
  }
  res.json(result);
});

export default router;
