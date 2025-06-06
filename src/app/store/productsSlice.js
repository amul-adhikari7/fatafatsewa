import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Async thunk for fetching all products (paginated)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (page = 1) => {
    const response = await fetch(`/api/products?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  }
);

// Async thunk for fetching a single product by ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    meta: {
      currentPage: 1,
      totalPages: 218,
      totalItems: 0,
    },
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.meta = {
          ...state.meta,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = {
          ...action.payload,
          // Ensure proper price formatting
          price:
            typeof action.payload.price === "string"
              ? parseInt(action.payload.price.replace(/[^\d]/g, ""))
              : action.payload.price,
          // Convert single image to array if needed
          images:
            action.payload.images ||
            (action.payload.image ? [action.payload.image] : []),
          // Ensure created_at is a valid date
          created_at: action.payload.created_at || new Date().toISOString(),
        };
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
