import express from 'express';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@/src/middleware/error.middleware';
import cors from 'cors';
import { loggerMiddleware } from '@/src/middleware/logger.middleware';
import * as process from 'process';
import { corsOptions } from '@/src/express.config';

const app = express();

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(router);
app.use(loggerMiddleware);
app.use(errorMiddleware);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
