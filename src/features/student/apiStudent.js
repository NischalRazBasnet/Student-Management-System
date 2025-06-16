import { mainApi } from '../../app/mainApi';

export const apiStudent = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (query) => ({
        url: '/students',
        method: 'GET',
        params: query,
      }),
      providesTags: ['Student'],
    }),

    addStudents: builder.mutation({
      query: (query) => ({
        url: '/students',
        method: 'POST',
        body: query.body,
        params: query,
      }),
      invalidatesTags: ['Student'],
    }),

    getStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET',
      }),
      providesTags: ['Student'],
    }),

    updateStudent: builder.mutation({
      query: (q) => ({
        url: `/students/${q.id}`,
        method: 'PATCH',
        body: q.body,
      }),
      invalidatesTags: ['Student'],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentsMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = apiStudent;
