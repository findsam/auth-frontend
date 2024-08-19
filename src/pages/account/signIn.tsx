import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInRequest } from "~/libs/types";
import { useLogin } from "~/libs/queries";
import Joi from "joi";
import { renderErrors } from "~/libs/util";
import { useAuth } from "~/libs/useAuth";

const SignIn: React.FC = () => {
  const loginQuery = useLogin();
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
    await loginQuery.mutateAsync(values);
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
          <button type="submit" style={{ maxWidth: "max-content" }}>
            continue
          </button>
        </form>
      </FormProvider>
      {renderErrors<SignInRequest>(methods.formState.errors)}
    </>
  );
};

export default SignIn;
