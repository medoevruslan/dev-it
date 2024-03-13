import schedule from 'node-schedule';
import { parseArticlesFromRSS } from '@/src/controller/article.controller';

export const startCrone = () =>
  schedule.scheduleJob('0 0 * * *', () => {
    parseArticlesFromRSS({} as any, {} as any, {} as any); // {} as any to mock the Request and Response and Next objects
  });
