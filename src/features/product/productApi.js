import { mainApi } from '../../app/mainApi';

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query,
      }),
      providesTags: ['Product'],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),

    getTop5Products: builder.query({
      query: (query) => ({
        url: '/products/top-5',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),

    addProducts: builder.mutation({
      query: (query) => ({
        url: '/products',
        method: 'POST',
        body: query.body,
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    updateProducts: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'PATCH',
        body: q.body,
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    removeProducts: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'DELETE',
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    addReview: builder.mutation({
      query: (q) => ({
        url: `/products/review/${q.id}`,
        body: q.body,
        method: 'PATCH',
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    deleteReview: builder.mutation({
      query: (q) => ({
        url: `/products/review/${q.id}`,
        method: 'DELETE',
        body: { username: q.username },
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetTop5ProductsQuery,
  useAddProductsMutation,
  useUpdateProductsMutation,
  useRemoveProductsMutation,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = productApi;
