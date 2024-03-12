export type ResponseArticles = {
  items: Article[];
  pagination: Pagination;
};
export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type GetArticlesArgs = {
  currentPage?: number;
  itemsPerPage?: number;
  orderBy?: string;
};

export type User = {
  username: string;
  email: string;
  userId: string;
  created: string;
  updated: string;
};

export type Article = {
  id: string;
  author: string;
  title: string;
  content: string;
  link: string;
};
