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
import { FcGoogle } from "react-icons/fc";
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
      <div className="flex items-center justify-center h-full w-full">
        <div className="border border-neutral-200 rounded-3xl overflow-hidden p-1 max-w-lg w-full h-max shadow-xl flex ">
          <div
            className="border border-[rgba(37,_99,_235,_0.1)] rounded-[1.25rem] overflow-hidden p-4 h-full w-full
            relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:-z-50
            after:bg-[linear-gradient(180deg,_rgba(37,_99,_235,_0.1),_rgba(37,_99,_235,_0.02)_12%,_#fff)]"
          >
            <div className="w-full max-w-md py-6">
              <div className="grid gap-2">
                <p className="font-bold text-stone-900 text-xl leading-none tracking-tight text-center">
                  Create an account
                </p>
                <p className="font-medium text-stone-500 text-sm leading-none tracking-tight text-center">
                  Create a free user account in less than 2 minutes.
                </p>

                <button
                  className="border border-neutral-300 rounded-lg px-4 py-2 mt-4 font-semibold text-stone-900 bg-white
                  text-sm leading-none tracking-tight flex items-center text-center justify-center gap-2 h-9.5 "
                >
                  <FcGoogle size={24} />
                  Sign-up with Google
                </button>

                <span className="mt-1 font-light text-neutral-400 px-0.5 text-xs leading-none tracking-tight text-center gap-2 after:w-full before:w-full after:h-[1px] before:h-[1px] after:bg-neutral-200 before:bg-neutral-200 after:block before:block flex items-center ">
                  OR
                </span>
              </div>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(signUp)}
                className="w-full grid gap-3"
              >
                <span className="w-full flex gap-3.5">
                  <InputField<SignUpRequest>
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                  />
                  <InputField<SignUpRequest>
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                  />
                </span>
                <InputField<SignUpRequest>
                  name="email"
                  required
                  label="Email"
                  placeholder="Valid email address"
                />
                <InputField<SignUpRequest>
                  name="password"
                  type="password"
                  required
                  label="Password"
                  placeholder="Create a password"
                />

                <div className="border-t border-bg-neutral-200 -mx-5 px-5 flex gap-3.5">
                  <button className="border border-neutral-300 rounded-lg px-4 py-2 mt-4 font-semibold text-stone-900 bg-white text-sm leading-none tracking-tight flex items-center text-center justify-center gap-2 h-9.5 hover:cursor-not-allowed">
                    Cancel
                  </button>

                  <button
                    className="ml-auto rounded-lg px-4 py-2 mt-4 font-medium text-sm leading-none tracking-tight flex items-center text-center justify-center gap-2 h-9.5  text-slate-50 bg-blue-950"
                    type="submit"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
