import { mainApi } from '../../app/mainApi';

const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => ({
        url: '/users/profile',
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (q) => ({
        url: '/users/profile',
        body: q.body,
        method: 'POST',
        headers: {
          Authorization: q.token,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;

export default userApi;
