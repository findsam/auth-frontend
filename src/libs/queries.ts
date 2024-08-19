import { useMutation, useQuery } from "react-query";
import { SignInRequest, SignUpRequest } from "~/libs/types";
import { axios, endpoints } from "~/libs/endpoint";
import { getCookie } from "~/libs/util";

export function useLogin() {
  return useMutation({
    mutationFn: async (values: SignInRequest) =>
      await axios.post<SignInRequest>(endpoints.auth.signin, values),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (values: SignUpRequest) =>
      await axios.post<SignUpRequest>(endpoints.auth.signup, values),
  });
}

export function usePing() {
  return useQuery({
    queryKey: ["ping"],
    queryFn: async () =>
      await axios.get<any>(endpoints.auth.user("66bff1853165b58880386aed"), {
        headers: {
          Authorization: getCookie("Authorization"),
        },
      }),
    retry: false,
    enabled: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useRefresh() {
  return useQuery({
    queryKey: ["refresh"],
    queryFn: async () => await axios.get<any>(endpoints.auth.refresh),
    retry: false,
    enabled: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
}
