import { mainApi } from '../../app/mainApi';

export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: ({ token, body }) => ({
        url: '/orders',
        method: 'POST',
        body,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ['Order'],
    }),

    // Optional: Fetch user orders
    getUserOrders: builder.query({
      query: (token) => ({
        url: '/orders/user',
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const { useAddOrderMutation, useGetUserOrdersQuery } = orderApi;
