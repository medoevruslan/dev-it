import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/src/services/auth/auth.service';

export const appSlice = createSlice({
  initialState: {},
  name: 'app',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.me.matchRejected, (state, action) => {
      console.log('app slice me matcher rejected');
    });
    builder.addMatcher(
      (action) => action.type.endsWith('executeQuery/rejected'),
      (state, action: PayloadAction<{ data: object; status: number }>) => {
        console.log('app slice other matcher rejected', action.payload.status);
      }
    );
  },
});

export const appActions = appSlice.actions;
