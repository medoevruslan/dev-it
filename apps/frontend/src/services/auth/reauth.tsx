import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from '@/src/services/base-api/base-api';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
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
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
