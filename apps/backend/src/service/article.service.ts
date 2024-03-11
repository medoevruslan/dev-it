import { ArticleModel } from '@/src/model/article.model';
import { Article } from '@/prisma/client';

export class ArticleService {
  #model = new ArticleModel();
  async create(article: Omit<Article, 'id'>) {
    return await this.#model.create(article);
  }

  async getAll() {
    return await this.#model.getAll();
  }

  async deleteToken(title: string) {
    return await this.#model.delete(title);
  }
}
