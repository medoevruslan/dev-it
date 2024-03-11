import express, { Request, Response } from 'express';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@/src/middleware/error.middleware';
import cors from 'cors';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const whitelist = ['http://localhost:4200'];

const corsOptions = {
  origin: function (origin: string, callback: (...args: unknown[]) => void) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(router);
// app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
