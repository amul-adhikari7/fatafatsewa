import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
