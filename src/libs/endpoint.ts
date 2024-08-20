import _axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { ResponseError, Response } from "~/libs/types";

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
