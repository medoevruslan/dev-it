import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { baseQueryWithReauth } from '@/src/services/auth/reauth';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:3000',
  credentials: 'include',
});

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['me', 'GetArticles'],
});
