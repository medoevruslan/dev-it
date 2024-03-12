import express from 'express';
import { articleController } from '../controller/article.controller';
import { authMiddleware } from '@/src/middleware/auth.middleware';

export const articleRouter = express.Router();

articleRouter.get(
  '/v1/articles/',
  authMiddleware,
  articleController.getArticles
);

articleRouter.get(
  '/v1/articles/:articleId',
  authMiddleware,
  articleController.getArticleById
);

articleRouter.patch(
  '/v1/articles/:articleId',
  authMiddleware,
  articleController.editArticle
);

articleRouter.delete(
  '/v1/articles/:articleId',
  authMiddleware,
  articleController.deleteArticle
);

articleRouter.post(
  '/v1/articles/parse',
  articleController.parseArticlesFromRSS
);
