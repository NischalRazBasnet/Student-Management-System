import { mainApi } from '../../app/mainApi';

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (val) => ({
        url: 'admin/login',
        body: val,
        method: 'POST',
      }),
    }),

    adminSignUP: builder.mutation({
      query: (val) => ({
        url: 'admin/setup',
        body: val,
        method: 'POST',
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useAdminSignUPMutation } = authApi;
