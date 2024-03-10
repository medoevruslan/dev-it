import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '@/src/exceptions/api-error';

export const validateResourceMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      throw ApiError.BadRequest('Bad Request', [err.message]);
    }
  };
