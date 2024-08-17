import { useMutation } from "react-query";
import { SignInInputs } from "~/libs/types";
import { axios, endpoints } from "~/libs/endpoint";

export function useLogin() {
  return useMutation({
    mutationFn: async (values: SignInInputs) =>
      await axios.post<any>(endpoints.auth.signin, values),
  });
}
