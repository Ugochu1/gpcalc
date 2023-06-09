import axios, { AxiosRequestConfig } from "axios";
import StorageService from "../services/storage";

function useHttp(httpProps: Pick<AxiosRequestConfig, "baseURL" | "headers">) {
  // destructure the props
  const { baseURL, headers } = httpProps;

  // create the axiosInstance
  const http = axios.create({
    baseURL,
    timeout: 120000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${StorageService.getAccessToken()}`,
      ...headers,
    },
  });

  // add a response interceptor
  http.interceptors.response.use(
    (response) => {
      if (response) {
        return response.data || response;
      }
    },
    (error) => {
      Promise.reject(
        (error.response && error.response.data) || error.response || error
      );
    }
  );

  return http;
}

export function serverHttp(httpProps: Pick<AxiosRequestConfig, "baseURL" | "headers">) {
  // destructure the props
  const { baseURL, headers } = httpProps;

  // create the axiosInstance
  const http = axios.create({
    baseURL,
    timeout: 120000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  // add a response interceptor
  http.interceptors.response.use(
    (response) => {
      if (response) {
        return response.data || response;
      }
    },
    (error) => {
      Promise.reject(
        (error.response && error.response.data) || error.response || error
      );
    }
  );

  return http;
}

export default useHttp;
