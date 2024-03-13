import { Article, PrismaClient } from '@/prisma/client';

export class ArticleModel {
  private readonly storage = new PrismaClient().article;
  async create(article: Omit<Article, 'id'>) {
    return this.storage.create({
      data: article,
    });
  }

  async update(articleId: string, data: Omit<Partial<Article>, 'id'>) {
    return await this.storage.update({ where: { id: articleId }, data });
  }
  async getLimit(currentPage = 1, itemsPerPage = 10, orderBy = '', name = '') {
    let skip = 0;
    const [field, sort] = orderBy.split('-');
    if (currentPage > 1) {
      skip = itemsPerPage * (currentPage - 1);
    }

    let where = {};

    if (name !== '') {
      where = {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      };
    }

    return this.storage.findMany({
      skip,
      take: itemsPerPage,
      orderBy: [
        {
          [field]: sort,
        },
      ],
      where,
    });
  }

  async getAll() {
    return this.storage.findMany();
  }

  async getById(id: string) {
    return this.storage.findUnique({ where: { id } });
  }

  async getCount() {
    return this.storage.count();
  }

  async delete(id: string) {
    return this.storage.delete({ where: { id } });
  }
}
