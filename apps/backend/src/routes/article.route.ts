import express from 'express';
import { articleController } from '../controller/article.controller';
import { authMiddleware } from '@/src/middleware/auth.middleware';

export const articleRouter = express.Router();

articleRouter.get(
  '/v1/articles/',
  authMiddleware,
  articleController.getArticles
);
articleRouter.post(
  '/v1/articles/',
  authMiddleware,
  articleController.createArticle
);

articleRouter.post(
  '/v1/articles/parse',
  articleController.parseArticlesFromRSS
);
