import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const loggerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const time = new Date().toLocaleDateString();
  logger.error(
    `${time}---message: ${err.message}\nstatus: ${err.status}\nstack: ${err.stack}`
  );

  next(err);
};
