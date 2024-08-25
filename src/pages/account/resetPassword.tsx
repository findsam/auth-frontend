import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ResetPasswordRequest } from "~/libs/types";
import { useResetPassword } from "~/libs/queries";
import Joi from "joi";
import InputField from "~/components/input";

const ResetPassword: React.FC = () => {
  const { mutateAsync } = useResetPassword();

  const methods = useForm<ResetPasswordRequest>({
    resolver: joiResolver(
      Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .label("Email"),
      }).messages({
        "string.empty": "{#label} is required",
      })
    ),
  });

  const resetPassword: SubmitHandler<ResetPasswordRequest> = async (values) => {
    await mutateAsync(values);
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(resetPassword)} className="form">
          <InputField<ResetPasswordRequest>
            name="email"
            label="Account email"
            placeholder="Enter your email"
          />
          <button className="form__submit" type="submit">
            Reset Password{" "}
          </button>
        </form>
      </FormProvider>
      {/* {renderErrors<ResetPasswordRequest>(methods.formState.errors)} */}
    </div>
  );
};

export default ResetPassword;
