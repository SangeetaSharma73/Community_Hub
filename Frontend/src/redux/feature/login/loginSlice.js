import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetails } from "./loginAsyncThunk";

const loginSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    status: "idle",
  },
  reducers: {
    resetUserDetails: (state) => {
      state.userDetails = null;
      state.loading = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetUserDetails } = loginSlice.actions;
export default loginSlice.reducer;
