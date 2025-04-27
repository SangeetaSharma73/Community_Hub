import axios from "axios";
import { BASE_URL } from "../utils/endpoint";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

function onTokenExpiry() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error.response;
    if (errorResponse && errorResponse.status === 401) {
      onTokenExpiry();
    }
    return Promise.reject(error);
  }
);
