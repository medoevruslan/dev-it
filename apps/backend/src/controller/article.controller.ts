import { Request, Response } from 'express';
import zod from 'zod';

// Sample Zod schema for article validation
const articleSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
});

const getArticles = (req: Request, res: Response) => {
  res.json({ artcles: 'Articles' });
};

const createArticle = (req: Request, res: Response) => {
  const newArticle = req.body;
  const article = articleSchema.safeParse(newArticle);

  if (article.success === false) {
    return res.status(400).json({ error: article.error.message });
  }

  res.sendStatus(201);
};

export const articleController = {
  getArticles,
  createArticle,
};

// Implement more CRUD controller...
