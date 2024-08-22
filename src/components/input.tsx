import {
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const InputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
  const methods = useFormContext<T>();
  return (
    <div className="form__row">
      <label className="form__row__label">
        {props.label}{" "}
        {props.required && <span className="form__row__label__star">*</span>}
      </label>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        {...methods.register(props.name)}
        {...props}
      />
      <p className="form__row__error">
        {methods.formState.errors[props.name]?.message as string}
      </p>
    </div>
  );
};

export default InputField;
