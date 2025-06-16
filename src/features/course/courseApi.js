import { mainApi } from '../../app/MainApi';

export const courseApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: '/courses',
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    addCourses: builder.mutation({
      query: (query) => ({
        url: '/courses',
        method: 'POST',
        body: query.body,
      }),
      invalidatesTags: ['Course'],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: (q) => ({
        url: `/courses/${q.id}`,
        method: 'PATCH',
        body: q.body,
      }),
      invalidatesTags: ['Course'],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddCoursesMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
