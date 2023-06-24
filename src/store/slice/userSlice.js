import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "store/actions";
import { userRegister } from "store/actions";

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
    [userRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.auth = false;
      state.login = {};
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
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
  },
});

export default userSlice.reducer;
