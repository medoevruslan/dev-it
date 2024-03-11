import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from '@/src/services/base-api/base-api';

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        method: 'POST',
        url: '/v1/auth/refresh-token',
      },
      api,
      extraOptions
    );

    if (refreshResult.meta?.response?.status === 204) {
      // store the new token
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
