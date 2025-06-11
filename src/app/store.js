import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './MainApi';
import { adminSlice } from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [adminSlice.name]: adminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});
