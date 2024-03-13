import { NextFunction, Request, Response } from 'express';
import { parseRSSFeed } from '@/src/utils/rss-parser';
import { ArticleService } from '@/src/service/article.service';
import { Article } from '@/prisma/client';
import { ApiError } from '@/src/exceptions/api-error';

export type GetArticlesArgs = {
  name?: string;
  currentPage?: number;
  itemsPerPage?: number;
  orderBy?: string;
};

const articleService = new ArticleService();

const getArticles = async (
  req: Request<object, object, object, GetArticlesArgs>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const articles = (await articleService.getAll(query)) || [];
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

const getArticleById = async (
  req: Request<{ articleId: string }>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.articleId;
  if (!id) {
    throw ApiError.NotFound('No such article id', []);
  }
  try {
    const article = await articleService.getById(id);
    res.json(article);
  } catch (err) {
    next(err);
  }
};

const editArticle = async (
  req: Request<{ articleId: string }, Omit<Partial<Article>, 'id'>>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.articleId;
  if (!id) {
    throw ApiError.NotFound('No such article id', []);
  }
  try {
    const article = await articleService.editArticle(id, req.body);
    res.json(article);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (
  req: Request<{ articleId: string }>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.articleId;
  if (!id) {
    throw ApiError.NotFound('No such article id', []);
  }
  try {
    await articleService.delete(id);
    res.sendStatus(204).end();
  } catch (err) {
    next(err);
  }
};

export const parseArticlesFromRSS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rssFeedUrl = 'https://feeds.simplecast.com/54nAGcIl'; // Replace with your chosen RSS feed URL

  try {
    await parseRSSFeed(rssFeedUrl);
    res.json({ message: 'Articles parsed successfully' });
  } catch (err) {
    next(new Error(`Error parsing articles from RSS feed: ${err.message}`));
  }
};

export const articleController = {
  getArticles,
  deleteArticle,
  getArticleById,
  editArticle,
  parseArticlesFromRSS,
};
