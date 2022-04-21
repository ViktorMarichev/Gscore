import axios, { AxiosRequestConfig } from "axios";

// экземпляр axios
type paramsType = {
  token?: string;
};
export const apiInstance = (params: paramsType = {}) => {
  const { token } = params;
  const config = {
    baseURL: "https://gscore-back.herokuapp.com/api",
    headers: { "Content-Type": "application/json" },
    timeout: 1000,
  } as AxiosRequestConfig;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return axios.create(config);
};
