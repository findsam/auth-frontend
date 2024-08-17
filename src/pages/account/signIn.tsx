import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SignInInputs } from "~/libs/types";

const SignIn: React.FC = () => {
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
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{ display: "grid", maxWidth: "270px", gap: "6px" }}
        onSubmit={methods.handleSubmit(login)}
      >
        <label>email</label>
        <input {...methods.register("email")} />
        <label>password</label>
        <input {...methods.register("password")} />
        <button type="submit">sign-in</button>
      </form>
    </FormProvider>
  );
};

export default SignIn;
