import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi } from "./api";

const initialState = {
  products: null,
  error: null,
  success:null,
  loading: false,
};

export const ProductsAsync = createAsyncThunk("products/all", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllProductsApi();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.success = "Products retrived Successfully"
        state.loading = false;
      })
      .addCase(ProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.products = null
        state.success = null
        state.error = action.payload;
      })
     
  },
});

export const { clearError, clearProducts } = productSlice.actions;

export default productSlice.reducer;
