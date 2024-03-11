import { Request, Response } from 'express';
import zod from 'zod';
import { parseRSSFeed } from '@/src/utils/rss-parser';
import { ArticleService } from '@/src/service/article.service';

// Sample Zod schema for article validation
const articleSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
});

const articleService = new ArticleService();

const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = (await articleService.getAll()) || [];
    res.status(200).json({ data: articles });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createArticle = (req: Request, res: Response) => {
  const newArticle = req.body;
  const article = articleSchema.safeParse(newArticle);

  if (article.success === false) {
    return res.status(400).json({ error: article.error.message });
  }

  res.sendStatus(201);
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
  parseArticlesFromRSS,
};
