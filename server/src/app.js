import express from 'express';
import cors from 'cors';
import authRouter from './router/auth.router.js';
import expenseRouter from './router/expense.router.js';
import limitRouter from './router/limit.router.js';
import errorHandler from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import checkRouteMiddleware from './middleware/checkRouteMiddleware.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the checkRoute middleware for all routes
app.use(checkRouteMiddleware);

app.use('/account', authRouter);
app.use('/expense', expenseRouter);
app.use('/limit', limitRouter);

app.use(errorHandler)

app.listen(5000, () => {
  console.log('Successfully started server on port 5000');
});
