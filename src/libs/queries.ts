import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ConfirmNewPasswordRequest,
  ResetPasswordRequest,
  Response,
  ResponseError,
  SignInRequest,
  SignInResponse,
  SignInResponseWithToken,
  SignUpRequest,
} from "~/libs/types";
import { axios, endpoints } from "~/libs/endpoint";
import { AxiosError } from "axios";

export function useLogin() {
  return useMutation<
    SignInResponseWithToken,
    AxiosError<ResponseError>,
    SignInRequest
  >({
    mutationFn: async (
      values: SignInRequest
    ): Promise<SignInResponseWithToken> => {
      return (
        await axios.post<SignInResponseWithToken>(endpoints.auth.signin, values)
      ).data;
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (values: SignUpRequest) =>
      await axios.post<SignUpRequest>(endpoints.auth.signup, values),
  });
}

export function useSelf() {
  return useQuery({
    queryKey: ["self"],
    queryFn: async () =>
      await axios.get<Response<SignInResponse>>(endpoints.auth.self),
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

export function useResetPassword() {
  return useMutation({
    mutationFn: async (values: ResetPasswordRequest) =>
      await axios.put<Response<unknown>>(endpoints.auth.reset, values),
  });
}

export function useConfirmNewPassword() {
  return useMutation({
    mutationFn: async (values: ConfirmNewPasswordRequest) =>
      await axios.put<any>(endpoints.auth.confirm, values),
  });
}
