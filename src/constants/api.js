import axios from "axios";

// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const apiInstance = axios.create({
  baseURL: "http://3.71.231.58/api/",
  // httpsAgent,
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
