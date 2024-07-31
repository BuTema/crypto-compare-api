import { Response, Router } from 'express';
import { getBestExchange } from '../services/exchange.service';
import { EstimateDTOInterface, EstimateInterface } from '../models/estimate.model';

const router = Router();

router.get('/', async (req: { query: EstimateDTOInterface }, res: Response) => {
  const { inputAmount, inputCurrency, outputCurrency } = req.query;
  const result: EstimateInterface | String = await getBestExchange(
    inputAmount,
    inputCurrency,
    outputCurrency,
  );
  res.json(result);
});

export default router;
