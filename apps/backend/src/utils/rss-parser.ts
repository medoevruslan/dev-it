import Parser from 'rss-parser';
import { Prisma, PrismaClient } from '@/prisma/client';
import ArticleCreateManyInput = Prisma.ArticleCreateManyInput;

const prisma = new PrismaClient();
const parser = new Parser();

export const parseRSSFeed = async (feedUrl: string) => {
  try {
    const feed = await parser.parseURL(feedUrl);

    const articles = await Promise.all(
      feed.items.map(async (item) => {
        return prisma.article.create({
          data: {
            title: item.title,
            content: item.content || item.contentSnippet || '',
            link: item.link,
            author: item.creator || 'unknown',
          },
        });
      })
    );

    return articles;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    throw error;
  }
};
