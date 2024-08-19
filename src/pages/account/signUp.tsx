import {
  FieldErrors,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignUpRequest } from "~/libs/types";
import { useSignUp } from "~/libs/queries";
import Joi from "joi";
import { renderErrors } from "~/libs/util";

const SignUp: React.FC = () => {
  const signUpQuery = useSignUp();

  const methods = useForm<SignUpRequest>({
    resolver: joiResolver(
      Joi.object({
        firstName: Joi.string().max(32).required().label("First name"),
        lastName: Joi.string().max(32).required().label("Last name"),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .label("Email"),
        password: Joi.string().min(6).max(32).required().label("Password"),
      }).messages({
        "string.empty": "{#label} is required",
      })
    ),
  });

  const signUp: SubmitHandler<SignUpRequest> = async (
    values: SignUpRequest
  ) => {
    await signUpQuery.mutateAsync(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          style={{ display: "grid", maxWidth: "270px", gap: "6px" }}
          onSubmit={methods.handleSubmit(signUp)}
        >
          <label>first name</label>
          <input {...methods.register("firstName")} />

          <label>last name</label>
          <input {...methods.register("lastName")} />

          <label>email</label>
          <input {...methods.register("email")} />
          <label>password</label>
          <input {...methods.register("password")} />
          <button type="submit" style={{ maxWidth: "max-content" }}>
            continue
          </button>
        </form>
      </FormProvider>
      {renderErrors<SignUpRequest>(methods.formState.errors)}
    </>
  );
};

export default SignUp;
