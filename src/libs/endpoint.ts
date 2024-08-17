import _axios from "axios";

export const endpoints = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  auth: {
    signin: "/users/user/sign-in",
    user: (id: string) => `/users/user/${id}`,
    refresh: "/users/user/refresh",
  },
};

export const axios = _axios.create({
  baseURL: endpoints.baseURL,
  withCredentials: true,
});
