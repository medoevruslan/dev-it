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
  name?: string;
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

export type ApiErrorType = {
  field: string;
  message: string;
};

export type ErrorDataType = {
  success: boolean;
  error: {
    code: string;
    message: string;
    errors: ApiErrorType[];
  };
};

export type CustomerError = {
  data: ErrorDataType;
  status: number;
};
