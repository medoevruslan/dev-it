import { Request, Response } from 'express';
import zod from 'zod';
import { parseRSSFeed } from '@/src/utils/rss-parser';
import { ArticleService } from '@/src/service/article.service';
import { Article } from '@/prisma/client';

const articleSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
});

export type GetArticlesArgs = {
  currentPage?: number;
  itemsPerPage?: number;
  orderBy?: string;
};

const articleService = new ArticleService();

const getArticles = async (
  req: Request<object, object, object, GetArticlesArgs>,
  res: Response
) => {
  try {
    const { query } = req;
    const articles = (await articleService.getAll(query)) || [];
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
};

const getArticleById = async (
  req: Request<{ articleId: string }>,
  res: Response
) => {
  const id = req.params.articleId;
  if (!id) {
    res.sendStatus(404).end();
  }
  const article = await articleService.getById(id);
  res.json(article);
};

const editArticle = async (
  req: Request<{ articleId: string }, Omit<Partial<Article>, 'id'>>,
  res: Response
) => {
  const id = req.params.articleId;
  if (!id) {
    res.sendStatus(404).end();
  }
  const article = await articleService.editArticle(id, req.body);
  res.json(article);
};

const createArticle = (req: Request, res: Response) => {
  const newArticle = req.body;
  const article = articleSchema.safeParse(newArticle);
  if (article.success === false) {
    return res.status(400).json({ error: article.error.message });
  }
  res.sendStatus(201).end();
};

const deleteArticle = async (
  req: Request<{ articleId: string }>,
  res: Response
) => {
  const id = req.params.articleId;
  if (!id) {
    res.sendStatus(404).end();
  }
  await articleService.delete(id);
  res.sendStatus(204).end();
};

const parseArticlesFromRSS = async (req: Request, res: Response) => {
  const rssFeedUrl = 'https://feeds.simplecast.com/54nAGcIl'; // Replace with your chosen RSS feed URL

  try {
    await parseRSSFeed(rssFeedUrl);
    res.json({ message: 'Articles parsed successfully' });
  } catch (error) {
    console.error('Error parsing articles from RSS feed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const articleController = {
  getArticles,
  createArticle,
  deleteArticle,
  getArticleById,
  editArticle,
  parseArticlesFromRSS,
};
