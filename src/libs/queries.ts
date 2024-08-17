import { useMutation, useQuery } from "react-query";
import { SignInInputs } from "~/libs/types";
import { axios, endpoints } from "~/libs/endpoint";

export function useLogin() {
  return useMutation({
    mutationFn: async (values: SignInInputs) =>
      await axios.post<any>(endpoints.auth.signin, values),
  });
}

export function usePing() {
  return useQuery({
    queryKey: ["ping"],
    queryFn: async () =>
      await axios.get<any>(endpoints.auth.user("66bff1853165b58880386aed")),
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
