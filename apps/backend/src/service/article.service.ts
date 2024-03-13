import { ArticleModel } from '@/src/model/article.model';
import { Article } from '@/prisma/client';
import { GetArticlesArgs } from '@/src/controller/article.controller';

export class ArticleService {
  private readonly model = new ArticleModel();
  async create(article: Omit<Article, 'id'>) {
    return await this.model.create(article);
  }

  async delete(articleId: string) {
    return await this.model.delete(articleId);
  }

  async editArticle(articleId: string, data: Omit<Partial<Article>, 'id'>) {
    return await this.model.update(articleId, data);
  }

  async getAll(query: GetArticlesArgs) {
    const totalItems = await this.model.getCount();
    const totalPages = Math.ceil(totalItems / query.itemsPerPage);
    const currentPage = query?.currentPage
      ? Number(query?.currentPage)
      : undefined;
    const itemsPerPage = query?.itemsPerPage
      ? Number(query?.itemsPerPage)
      : undefined;
    const result = await this.model.getLimit(
      currentPage,
      itemsPerPage,
      query.orderBy,
      query.name
    );
    return {
      items: result,
      pagination: {
        currentPage,
        itemsPerPage,
        totalItems,
        totalPages,
      },
    };
  }

  async getArticleCount() {
    return this.model.getCount();
  }

  async getById(articleId: string) {
    return this.model.getById(articleId);
  }
}
