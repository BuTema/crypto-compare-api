import express from 'express';
import estimateRouter from './controllers/estimate.controller';
import getRates from './controllers/getRates.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/estimate', estimateRouter);
app.use('/getRates', getRates);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
