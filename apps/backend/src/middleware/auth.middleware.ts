import { NextFunction, Request, Response } from 'express';
import { TokenService } from '@/src/service/token.service';

const tokenService = new TokenService();
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(new Error('Not Authorized'));
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(new Error('Not Authorized'));
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(new Error('Not Authorized'));
  }
};
