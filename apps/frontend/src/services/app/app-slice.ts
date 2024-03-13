import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CustomerError } from '@/src/services/types';
import { toast } from 'react-toastify';

export const appSlice = createSlice({
  initialState: {},
  name: 'app',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('executeQuery/rejected'),
      (state, action: PayloadAction<CustomerError>) => {
        const { status, data } = action.payload;
        status >= 500 && toast.error(data.error.message);
        status >= 500 && toast.error(data.error.code);
      }
    );
  },
});

export const appActions = appSlice.actions;
