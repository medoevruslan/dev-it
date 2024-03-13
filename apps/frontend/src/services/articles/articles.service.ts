import { baseApi } from '@/src/services/base-api/base-api';
import {
  Article,
  GetArticlesArgs,
  ResponseArticles,
} from '@/src/services/types';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getArticles: build.query<ResponseArticles, GetArticlesArgs | void>({
        query: (args) => ({
          params: args ?? undefined,
          url: 'v1/articles/',
        }),
        providesTags: ['GetArticles'],
      }),
      getArticleById: build.query<Article | null, { articleId: string }>({
        query: ({ articleId }) => ({
          url: `v1/articles/${articleId}`,
        }),
        providesTags: ['GetArticle'],
      }),
      editArticle: build.mutation<
        Article,
        { articleId: string; data: Partial<Article> }
      >({
        query: ({ articleId, data }) => ({
          url: `v1/articles/${articleId}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['GetArticles'],
      }),
      parse: build.mutation<{ message: string }, void>({
        query: () => ({
          url: 'v1/articles/parse',
          method: 'POST',
        }),
        invalidatesTags: ['GetArticles'],
      }),
      deleteArticle: build.mutation<void, { articleId: string }>({
        query: ({ articleId }) => ({
          url: `v1/articles/${articleId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['GetArticles'],
      }),
    };
  },
});

export const {
  useGetArticlesQuery,
  useParseMutation,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  useEditArticleMutation,
} = articlesApi;
