import { createSlice } from "@reduxjs/toolkit";
import { logout } from "store/actions";
import { userLogin } from "store/actions";

const initialState = {
  login: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  auth: false,
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
      state.auth = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [logout]: (state) => {
      state.auth = initialState.auth;
      state.login = initialState.login;
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;
