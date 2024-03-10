import express, { Request, Response } from 'express';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@/src/middleware/error.middleware';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
// app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
