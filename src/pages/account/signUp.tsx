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
      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(signUp)} className="form">
            <span style={{ display: "flex", gap: "1.3rem" }}>
              <span className="form__row">
                <label className="form__row__label">
                  First name <span className="form__row__label__star">*</span>
                </label>
                <input
                  {...methods.register("firstName")}
                  placeholder="Your name"
                />
              </span>
              <span className="form__row">
                <label>Last name</label>
                <input
                  placeholder="Your last name"
                  {...methods.register("lastName")}
                />
              </span>
            </span>
            <span className="form__row">
              <label className="form__row__label">
                Email <span className="form__row__label__star">*</span>
              </label>
              <input
                placeholder="Enter your email"
                {...methods.register("email")}
              />
            </span>{" "}
            <span className="form__row">
              <label className="form__row__label">
                Password <span className="form__row__label__star">*</span>
              </label>
              <input
                placeholder="Create a password"
                {...methods.register("password")}
              />
            </span>
            <button className="form__submit" type="submit">
              Sign Up{" "}
            </button>
            <p className="form__notification">
              Already have an account?{" "}
              <span className="form__notification__button">Sign In</span>
            </p>
          </form>
        </FormProvider>
        {renderErrors<SignUpRequest>(methods.formState.errors)}
      </div>
    </>
  );
};

export default SignUp;
