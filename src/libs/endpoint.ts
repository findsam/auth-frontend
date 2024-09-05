import _axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { ResponseError, Response } from "~/libs/types";
import {
  bakeLocalStorage,
  deleteLocalStorage,
  readLocalStorage,
  SignOut,
} from "~/libs/util";

export const endpoints = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  auth: {
    self: `/users/user`,
    signin: "/users/user/sign-in",
    signup: "/users/user/sign-up",
    refresh: "/users/user/refresh",
    reset: "/users/user/reset-password",
    confirm: "/users/user/confirm-reset-password",
  },
};

export const axios = _axios.create({
  baseURL: endpoints.baseURL,
  withCredentials: true,
});

//Generic toast responses for success and failure instances.
axios.interceptors.response.use(
  (response: AxiosResponse<Response<unknown>, unknown>) => {
    if (typeof response.data.message === "string") {
      toast.success(response.data.message ?? response.statusText);
    }
    return Promise.resolve(response);
  },
  (error: AxiosError<ResponseError>) => {
    if (error.response) {
      toast.error(error.response.data.message ?? error.message);
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
          /* we MUST use the default axios instance for this one request 
          otherwise we can trigger and infinite loop due to interceptors. */
          try {
            const response = await _axios.get<{ token: string }>(
              endpoints.baseURL + endpoints.auth.refresh,
              {
                withCredentials: true,
              }
            );
            request.headers["Authorization"] = `Bearer ${response.data.token}`;
            bakeLocalStorage("authorization", response.data.token);
            return request;
          } catch (err) {
            /* If in case the refresh has expired, we have to delete the auth/user from 
            localstorage to ensure we don't trigger the refresh endpoint on each
            request. */
            SignOut();
            throw new Error("Refresh token invalid.");
          }
        }
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
