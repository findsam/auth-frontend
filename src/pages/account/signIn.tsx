import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInRequest } from "~/libs/types";
import { useLogin } from "~/libs/queries";
import Joi from "joi";
import { renderErrors } from "~/libs/util";
import { useAuth } from "~/libs/useAuth";

const SignIn: React.FC = () => {
  const { data, error, mutateAsync } = useLogin();
  const { setUser } = useAuth();

  const methods = useForm<SignInRequest>({
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

  const login: SubmitHandler<SignInRequest> = async (values) => {
    const data = await mutateAsync(values);
    setUser?.(data.results[0]);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(login)}>
          <label>Email</label>
          <input {...methods.register("email")} defaultValue="dev@dev.com" />
          <label>Password</label>
          <input {...methods.register("password")} defaultValue="dev" />
          <button type="submit" style={{ maxWidth: "max-content" }}>
            Sign In
          </button>
        </form>
      </FormProvider>
      {renderErrors<SignInRequest>(methods.formState.errors)}
    </>
  );
};

export default SignIn;
