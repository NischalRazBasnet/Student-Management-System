import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFromLocal } from '../features/local/local';

export const baseUrl = 'http://192.168.1.76:5000';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/`,
    prepareHeaders: (headers) => {
      const admin = getFromLocal();

      if (admin && admin.token) {
        headers.set('Authorization', `Bearer ${admin.token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
