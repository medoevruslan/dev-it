import { Request, Response, NextFunction } from 'express';
import winston, { format } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.printf((info) => info.message),
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
  const time = new Date().toISOString();
  logger.error(`
    ${time}
    message: ${err.message}
    status: ${err.status}
    stack: ${err.stack}
    `);

  next(err);
};
