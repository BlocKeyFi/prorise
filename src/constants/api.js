import axios from "axios";
import { BASE_URL } from "./constants";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

// Function to set the Bearer token
export const setAuthToken = (token) => {
  if (token) {
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.common["Authorization"];
  }
};

export default apiInstance;
