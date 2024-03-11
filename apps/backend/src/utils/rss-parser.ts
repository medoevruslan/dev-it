import Parser from 'rss-parser';
import { PrismaClient } from '@/prisma/client';

const prisma = new PrismaClient();
const parser = new Parser();

export const parseRSSFeed = async (feedUrl: string) => {
  try {
    const feed = await parser.parseURL(feedUrl);

    const articles = await Promise.all(
      feed.items.map(async (item) => {
        const existingArticle = await prisma.article.findFirst({
          where: { link: item.link },
        });

        if (!existingArticle) {
          return prisma.article.create({
            data: {
              title: item.title,
              content: item.content || item.contentSnippet || '',
              link: item.link,
              author: item.creator || 'unknown',
              // Add more fields as needed
            },
          });
        }

        return null;
      })
    );

    return articles.filter(Boolean);
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    throw error;
  }
};
