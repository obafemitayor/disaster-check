import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import router from './routes';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api', router);

export { app };
