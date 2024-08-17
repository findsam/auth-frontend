import { SignInInputs } from "~/libs/types";
import _axios from "axios";

export const endpoints = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  auth: {
    signin: "/users/user/sign-in",
  },
};

export const axios = _axios.create({
  baseURL: endpoints.baseURL,
  withCredentials: true,
});
