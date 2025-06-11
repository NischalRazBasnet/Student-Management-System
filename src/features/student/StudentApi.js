import { mainApi } from '../../app/MainApi';

export const studentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (query) => ({
        url: '/students',
        method: 'GET',
        params: query,
      }),
    }),

    addStudents: builder.mutation({
      query: (query) => ({
        url: '/students',
        method: 'POST',
        body: query.body,
        params: query,
      }),
    }),

    getStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET',
      }),
    }),

    updateStudent: builder.mutation({
      query: (q) => ({
        url: `/students/${q.id}`,
        method: 'PATCH',
        body: q.body,
      }),
    }),

    deleteStudent: builder.mutation({
      query: (q) => ({
        url: `/students/${q.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentsMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
