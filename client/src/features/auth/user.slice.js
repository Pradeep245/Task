import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, signinApi,signOutApi } from "./api";

const initialState = {
  user: null,
  error: null,
  success:null,
  loading: false,
};

export const signupAsync = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await signupApi(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signinAsync = createAsyncThunk("auth/signin", async (userData, { rejectWithValue }) => {
  try {
    const response = await signinApi(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signoutAsync = createAsyncThunk("auth/signout", async (userData, { rejectWithValue }) => {
  try {
    const response = await signOutApi();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = "Signup Successfully"
        state.loading = false;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null
        state.success = null
        state.error = action.payload;
      })
      .addCase(signinAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = "Signin Successfully"
        state.loading = false;
        sessionStorage.setItem("token",action.payload.token)
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null
        state.success = null
        state.error = action.payload;
      }).addCase(signoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signoutAsync.fulfilled, (state, action) => {
        state.user = null;
        state.success = null
        state.loading = false;
        sessionStorage.removeItem("token")
      })
      .addCase(signoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null
        state.success = null
        state.error = action.payload;
      });
  },
});

export const { clearError, clearUser } = authSlice.actions;

export default authSlice.reducer;
