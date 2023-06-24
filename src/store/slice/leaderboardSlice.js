import { createSlice } from "@reduxjs/toolkit";
import { getTraderPositions } from "store/actions";
import { getLeaderboardsData } from "store/actions";

const initialState = {
  data: [],
  traderPositions: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "leader",
  initialState,
  extraReducers: {
    [getLeaderboardsData.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeaderboardsData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload?.result;
    },
    [getLeaderboardsData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [getTraderPositions.pending]: (state) => {
      state.isLoading = true;
    },
    [getTraderPositions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.traderPositions = payload?.result?.perpetual;
    },
    [getTraderPositions.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
