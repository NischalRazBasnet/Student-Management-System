import { mainApi } from '../../app/MainApi';

export const courseApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: '/courses',
        method: 'GET',
      }),
    }),
    addCourses: builder.mutation({
      query: (query) => ({
        url: '/courses',
        method: 'POST',
        body: query.body,
      }),
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'GET',
      }),

      updateCourse: builder.mutation({
        query: (q) => ({
          url: `/courses/${q.id}`,
          method: 'PATCH',
          body: q.body,
        }),
      }),

      deleteCourse: builder.mutation({
        query: (id) => ({
          url: `/courses/${id}`,
          method: 'DELETE',
        }),
      }),
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
