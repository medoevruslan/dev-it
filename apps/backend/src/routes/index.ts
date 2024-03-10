import express from 'express';
import { articleRouter } from './article.route';
import { authRouter } from './auth.route';

export const router = express.Router();

router.use(articleRouter);
router.use(authRouter);
