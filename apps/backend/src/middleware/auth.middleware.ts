import { NextFunction, Request, Response } from 'express';
import { TokenService } from '@/src/service/token.service';
import { ApiError } from '@/src/exceptions/api-error';

const tokenService = new TokenService();
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (err) {
    next(ApiError.UnauthorizedError());
  }
};
