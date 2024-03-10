import express from 'express';
import { authMiddleware } from '@/src/middleware/auth.middleware';

export const adminRoute = express.Router();

adminRoute.get('/v1/admin', authMiddleware);
