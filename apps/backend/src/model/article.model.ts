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
  async getLimit(currentPage = 1, itemsPerPage = 10, orderBy = '') {
    let skip = 0;
    const [field, sort] = orderBy.split('-');
    if (currentPage > 1) {
      skip = itemsPerPage * (currentPage - 1);
    }
    return this.#storage.findMany({
      skip,
      take: itemsPerPage,
      orderBy: [
        {
          [field]: sort,
        },
      ],
    });
  }

  async getAll() {
    return this.#storage.findMany();
  }

  async getCount() {
    return this.#storage.count();
  }
}
