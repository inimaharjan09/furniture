import { mainApi } from '../../app/mainApi.js';
const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (value) => ({
        url: '/users/login',
        method: 'POST',
        body: value,
      }),
    }),

    userSignUp: builder.mutation({
      query: (value) => ({
        url: '/users/register',
        method: 'POST',
        body: value,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserSignUpMutation } = authApi;
