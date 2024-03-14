import { Request, Response } from 'express';
import { ApiError } from '@/src/exceptions/api-error';

export const errorMiddleware = (err: unknown, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      error: {
        code: 'API_ERROR',
        message: err.message,
        errors: err.errors,
      },
    });
  }
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'Unexpected error',
      errors: [],
    },
  });
};
