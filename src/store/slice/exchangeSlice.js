import { createSlice } from "@reduxjs/toolkit";
import { exchange } from "store/actions";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  extraReducers: {
    [exchange.pending]: (state) => {
      state.isLoading = true;
    },
    [exchange.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [exchange.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default exchangeSlice.reducer;
