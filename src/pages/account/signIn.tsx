import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInRequest } from "~/libs/types";
import { useLogin } from "~/libs/queries";
import Joi from "joi";
import { useAuth } from "~/libs/useAuth";
import { Link, useNavigate } from "react-router-dom";
import InputField from "~/components/input";

const SignIn: React.FC = () => {
  const { mutateAsync, error } = useLogin();
  const { handleUser } = useAuth();
  const navigate = useNavigate();

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
    if (!handleUser) return;
    handleUser(data);
    navigate("/account/settings");
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(login)} className="form">
          <InputField<SignInRequest>
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <InputField<SignInRequest>
            name="password"
            label="Password"
            placeholder="Enter your password"
          />{" "}
          <button className="form__submit" type="submit">
            Sign In{" "}
          </button>
          <p className="form__notification">
            Don't have an account?{" "}
            <Link to="/account/sign-up" className="form__notification__button">
              Sign Up
            </Link>
          </p>
        </form>
      </FormProvider>
      {/* {renderErrors<SignInRequest>(methods.formState.errors)} */}
    </div>
  );
};

export default SignIn;
