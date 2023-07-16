import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://3.71.231.58/api/",
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
