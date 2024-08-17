import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { endpoints } from "~/libs/endpoint";
import { useLogin } from "~/libs/queries";
import { SignInInputs } from "~/libs/types";

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
    const inf = await loginQuery.mutateAsync(values);
    console.log(inf);
  };

  return (
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
  );
};

export default SignIn;
