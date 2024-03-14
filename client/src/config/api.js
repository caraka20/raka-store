import axios from "axios";
import Cookies from "js-cookie";

// import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const userToken = Cookies.get("user_token");
  if (userToken) {
    config.headers.authorization = `Bearer ${userToken}` || "";
  }
  return config;
});

export default axiosInstance;
