import { baseApi } from '@/src/services/base-api/base-api';
import { Article } from '@/src/services/types';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getArticles: build.query<{ data: Article[] }, void>({
        query: () => ({
          url: 'v1/articles/',
        }),
      }),
      parse: build.mutation<void, void>({
        query: () => ({
          url: 'v1/articles/parse',
          method: 'POST',
        }),
      }),
    };
  },
});

export const { useGetArticlesQuery, useParseMutation } = articlesApi;
