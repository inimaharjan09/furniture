// src/features/wishlist/wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

// ✅ Export actions
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishListItems = (state) => state.wishlist.items;
export default wishlistSlice;
