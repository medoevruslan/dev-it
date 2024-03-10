import express from 'express';
import { authController } from '../controller/auth.controller';

export const authRouter = express.Router();

authRouter.post('/v1/auth/sign-up', authController.signup);
authRouter.post('/v1/auth/login', authController.login);
authRouter.post('/v1/auth/logout', authController.logout);
authRouter.post('/v1/auth/refresh-token', authController.refreshToken);
authRouter.get('/v1/auth/me', authController.me);
