import { baseApi } from '@/src/services/base-api/base-api';
import { SigninFormValues } from '@/src/components/auth/signin-form';
import { SignupFormValues } from '@/src/components/auth/signup-form';
import { User } from '@/src/services/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      login: build.mutation<
        {
          accessToken: string;
        },
        SigninFormValues
      >({
        invalidatesTags: ['me'],
        query: (body) => ({
          body,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: build.mutation<void, void>({
        invalidatesTags: ['me'],
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      me: build.query<User, void>({
        providesTags: ['me'],
        query: () => ({
          url: '/v1/auth/me',
        }),
      }),
      signup: build.mutation<User, Omit<SignupFormValues, 'confirmPassword'>>({
        invalidatesTags: ['me'],
        query: (body) => ({
          body,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useSignupMutation,
} = authApi;
