import axios from "axios";



export const apiInstance = axios.create({
  baseURL: "https://ec2-18-194-220-237.eu-central-1.compute.amazonaws.com/api/",
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
