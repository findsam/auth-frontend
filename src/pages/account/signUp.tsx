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
import { FcGoogle } from "react-icons/fc";

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
      <div className="flex items-center justify-center h-full w-full">
        <div className="border border-neutral-200 rounded-3xl overflow-hidden p-1 max-w-md w-full max-h-64 h-full shadow-2xl flex">
          <div
            className="border border-[rgba(77,_0,_255,_0.14)] rounded-[1.15rem] overflow-hidden p-4 h-full w-full
            relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:-z-50
            after:bg-[linear-gradient(180deg,_rgba(77,_0,_255,_0.08),_rgba(77,_0,_255,_0.03)_18%,_#fff)]"
          >
            <div className="w-full max-w-md py-4">
              <div className="grid gap-2">
                <p className="font-bold text-stone-900 text-2xl leading-none tracking-tight text-center">
                  Create an account
                </p>
                <p className="font-medium text-stone-500 text-md leading-none tracking-tight text-center">
                  Create a free user account in less than 2 minutes.
                </p>

                <button
                  className="border border-neutral-300 rounded-lg px-4 py-2.5 mt-4 font-semibold text-stone-900 
                  text-md leading-none tracking-tight flex items-center text-center justify-center gap-2"
                >
                  <FcGoogle size={24} />
                  Sign-up with Google
                </button>

                <span className="mt-1 font-semibold text-sm text-stone-500 text-md leading-none tracking-tight text-center gap-2 after:w-full before:w-full after:h-[1px] before:h-[1px] after:bg-neutral-200 before:bg-neutral-200 after:block before:block flex items-center ">
                  OR
                </span>
              </div>
            </div>
            {/* <FormProvider {...methods}>
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
                  type="password"
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
            </FormProvider> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
