import _axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { ResponseError, Response } from "~/libs/types";
import { bakeLocalStorage, readLocalStorage } from "~/libs/util";

export const endpoints = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  auth: {
    signin: "/users/user/sign-in",
    signup: "/users/user/sign-up",
    user: (id: string) => `/users/user/${id}`,
    refresh: "/users/user/refresh",
  },
};

export const axios = _axios.create({
  baseURL: endpoints.baseURL,
  withCredentials: true,
});

//Generic toast responses for success and failure instances.
axios.interceptors.response.use(
  (response: AxiosResponse<Response<unknown>, unknown>) => {
    toast.success(response.data.message ?? response.statusText);
    return Promise.resolve(response);
  },
  (error: AxiosError<ResponseError>) => {
    if (error.response) {
      toast.error(error.response.data.error ?? error.message);
      return Promise.reject(error);
    }
  }
);

//Handles token refreshing on requests.
axios.interceptors.request.use(
  async (request) => {
    request.withCredentials = true;
    let token = readLocalStorage("authorization");
    if (typeof token === "string" && token) {
      const claims = jwtDecode(token);
      if (claims && claims.exp) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const hasExpired = currentTimeInSeconds > claims.exp;
        if (hasExpired == false) {
          request.headers["Authorization"] = `Bearer ${token}`;
          return request;
        }
        if (hasExpired) {
          // we use default axios instance here to prevent infinite loop.
          const response = await _axios.get<{ token: string }>(
            endpoints.baseURL + endpoints.auth.refresh,
            {
              withCredentials: true,
            }
          );
          request.headers["Authorization"] = `Bearer ${response.data.token}`;
          bakeLocalStorage("authorization", response.data.token);
          return request;
        }
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
