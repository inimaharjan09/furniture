import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './mainApi';
import { userSlice } from '../features/user/userSlice';
import { cartSlice } from '../features/cart/cartSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [wishlistSlice.name]: wishlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});
