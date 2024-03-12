import { baseApi } from '@/src/services/base-api/base-api';
import { GetArticlesArgs, ResponseArticles } from '@/src/services/types';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getArticles: build.query<ResponseArticles, GetArticlesArgs | void>({
        query: (args) => ({
          params: args ?? undefined,
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
