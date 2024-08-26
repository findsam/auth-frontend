import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ConfirmNewPasswordRequest } from "~/libs/types";
import {
  useConfirmNewPassword,
  useLogin,
  useResetPassword,
} from "~/libs/queries";
import Joi from "joi";
import InputField from "~/components/input";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ConfirmPassword: React.FC = () => {
  const { token } = useParams();
  const { mutateAsync } = useConfirmNewPassword();

  const methods = useForm<ConfirmNewPasswordRequest>({
    resolver: joiResolver(
      Joi.object({
        password: Joi.string().min(6).max(32).required().label("Password"),
      }).messages({
        "string.empty": "{#label} is required",
      })
    ),
  });

  const confirmNewPassword: SubmitHandler<ConfirmNewPasswordRequest> = async (
    values
  ) => {
    if (!token) return;
    const data = await mutateAsync({ ...values, token });
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(confirmNewPassword)}
          className="form"
        >
          <InputField<ConfirmNewPasswordRequest>
            name="password"
            label="New Password"
            type="password"
            placeholder="Create a new password"
          />
          <button className="form__submit" type="submit">
            Confirm Password{" "}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ConfirmPassword;
