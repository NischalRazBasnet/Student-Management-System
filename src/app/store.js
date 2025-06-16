import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './MainApi';
import { adminSlice } from '../features/admin/adminSlice';
import { modalSlice } from '../features/modal/modalSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [adminSlice.name]: adminSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});
