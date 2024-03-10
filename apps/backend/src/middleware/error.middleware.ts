import { Request, NextFunction, Response } from 'express';
import { ApiError } from '@/src/exceptions/api-error';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({
    message: `Unexpected error: ${(err as { message: string }).message}`,
  });
};
