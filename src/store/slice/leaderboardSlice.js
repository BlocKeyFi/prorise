import { createSlice } from "@reduxjs/toolkit";
import { resetTraderPositions } from "store/actions";
import { clearState } from "store/actions";
import { getTraderPositions } from "store/actions";
import { getLeaderboardsData } from "store/actions";

const initialState = {
  data: [],
  traderPositions: [],
  traderHistory: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const leaderboardSlice = createSlice({
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
      state.traderPositions = initialState.traderPositions;
    },
    [getTraderPositions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.traderPositions = payload?.result?.perpetual;
      state.traderHistory = payload?.result?.history;
    },
    [getTraderPositions.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [resetTraderPositions]: (state) => {
      state.traderPositions = initialState.traderPositions;
    },
  },
});

export default leaderboardSlice.reducer;
