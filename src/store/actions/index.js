import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "constants/api";
import { setAuthToken } from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { toast } from "react-hot-toast";

export const userRegister = createAsyncThunk(
  "user/Register",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post(`${PRO_RISE.register}`, params);
      toast.success("Successfully Register");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/Login",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post(`${PRO_RISE.login}`, params);
      toast.success("Successfully Login");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const exchange = createAsyncThunk(
  "exchange/exchangeConnection",
  async (params, { rejectWithValue }) => {
    try {
      setAuthToken(localStorage.getItem("jwt"));
      const { data } = await apiInstance.post(
        `${PRO_RISE.exchangeConection}`,
        params
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getLeaderboardsData = createAsyncThunk(
  "leader/getLeaderboardsData",
  async (params, { rejectWithValue }) => {
    try {
      setAuthToken(localStorage.getItem("jwt"));
      const { data } = await apiInstance.post(
        `${PRO_RISE.getLeaderboardsData}`,
        params
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTraderPositions = createAsyncThunk(
  "leader/getTraderPositions",
  async (params, { rejectWithValue }) => {
    try {
      setAuthToken(localStorage.getItem("jwt"));
      const { data } = await apiInstance.post(
        `${PRO_RISE.getTraderPositions}`,
        params
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeToPackage = createAsyncThunk(
  "leader/subscribeToPackage",
  async (params, { rejectWithValue }) => {
    try {
      setAuthToken(localStorage.getItem("jwt"));
      const { data } = await apiInstance.post(
        `${PRO_RISE.subscribeToPackage}`,
        params
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
