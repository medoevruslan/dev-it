import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/src/services/base-api/base-api';
import { authApi } from '@/src/services/auth/auth.service';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, authApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
