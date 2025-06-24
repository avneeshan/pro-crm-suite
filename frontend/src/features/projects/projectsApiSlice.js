import { apiSlice } from '../api/apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query({
      query: () => '/projects',
      providesTags: (result = [], error, arg) => [
        'Project',
        ...result.map(({ _id }) => ({ type: 'Project', id: _id })),
      ],
    }),
    getProjectById: builder.query({
      query: id => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation({
        query: initialProjectData => ({
            url: '/projects',
            method: 'POST',
            body: initialProjectData,
        }),
        invalidatesTags: ['Project'],
    }),
    // ... update, delete mutations
  })
})

export const { useGetProjectsQuery, useGetProjectByIdQuery, useCreateProjectMutation } = projectsApiSlice;