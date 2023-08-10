import { createSlice } from "@reduxjs/toolkit";
import { getRefralLink } from "store/actions";
import { subscribeToPackage } from "store/actions";
import { logout } from "store/actions";
import { userLogin } from "store/actions";

const initialState = {
  login: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  auth: false,
  refralLink: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.login = payload;
      localStorage.setItem("jwt", payload.token);
      state.errorMessage = "";
      state.auth = payload?.user?.currentSubscription ? true : false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [subscribeToPackage.pending]: (state) => {
      state.isLoading = true;
    },
    [subscribeToPackage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = "";
      state.auth = true;
    },
    [subscribeToPackage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [getRefralLink]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = "";
      state.refralLink = payload;
    },

    [logout]: (state) => {
      state.auth = initialState.auth;
      state.login = initialState.login;
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;
