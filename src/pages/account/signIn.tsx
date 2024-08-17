import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInInputs } from "~/libs/types";
import { useLogin, usePing, useRefresh } from "~/libs/queries";
import Joi from "joi";

const SignIn: React.FC = () => {
  const loginQuery = useLogin();

  const methods = useForm<SignInInputs>({
    resolver: joiResolver(
      Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .label("Email"),
        password: Joi.string().max(32).required().label("Password"),
      }).messages({
        "string.empty": "{#label} is required",
      })
    ),
  });

  const login: SubmitHandler<SignInInputs> = async (values: SignInInputs) => {
    await loginQuery.mutateAsync(values);
  };

  const pingQuery = usePing();
  const ping = async () => {
    console.log(await pingQuery.refetch());
  };

  const refreshQuery = useRefresh();
  const refresh = async () => {
    console.log(await refreshQuery.refetch());
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          style={{ display: "grid", maxWidth: "270px", gap: "6px" }}
          onSubmit={methods.handleSubmit(login)}
        >
          <label>email</label>
          <input {...methods.register("email")} defaultValue="dev@dev.com" />
          <label>password</label>
          <input {...methods.register("password")} defaultValue="dev" />
          <button type="submit">sign-in</button>
        </form>
      </FormProvider>
      <div style={{ marginTop: "20rem" }}>
        <button type="submit" onClick={async () => await refresh()}>
          ping refresh
        </button>

        <button type="submit" onClick={async () => await ping()}>
          ping self
        </button>
      </div>
    </>
  );
};

export default SignIn;
