import { Article, PrismaClient } from '@/prisma/client';

export class ArticleModel {
  #storage = new PrismaClient().article;
  async create(article: Omit<Article, 'id'>) {
    return this.#storage.create({
      data: article,
    });
  }
  async delete(title: string) {
    return this.#storage.delete({ where: { title: title } });
  }
  async getAll() {
    return this.#storage.findMany();
  }
}
