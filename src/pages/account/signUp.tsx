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
import InputField from "~/components/input";
import { Link } from "react-router-dom";

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
              <InputField<SignUpRequest>
                name="firstName"
                label="First Name"
                placeholder="Your first name"
              />
              <InputField<SignUpRequest>
                name="lastName"
                label="Last Name"
                placeholder="Your last name"
              />
            </span>
            <InputField<SignUpRequest>
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <InputField<SignUpRequest>
              name="password"
              label="Password"
              placeholder="Create a password"
            />
            <button className="form__submit" type="submit">
              Sign Up{" "}
            </button>
            <p className="form__notification">
              Already have an account?{" "}
              <Link
                to="/account/sign-in"
                className="form__notification__button"
              >
                Sign In
              </Link>
            </p>
          </form>
        </FormProvider>
        {/* {renderErrors<SignUpRequest>(methods.formState.errors)} */}
      </div>
    </>
  );
};

export default SignUp;
