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
  type?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const InputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
  const methods = useFormContext<T>();
  return (
    <div className="flex-1">
      <label className="font-medium text-stone-500 text-xs leading-none tracking-tight text-center">
        {props.label}{" "}
      </label>
      <input
        placeholder={props.placeholder}
        type={props.type || "text"}
        {...methods.register(props.name)}
        {...props}
        className="h-9.5 border border-neutral-300 rounded-lg px-2 flex items-center gap-2 w-full font-medium text-stone-500 text-xs placeholder:font-medium placeholder:text-stone-500 placeholder:text-xs hover:outline-blue-950 focus:outline-blue-950 outline-0.5 text-stone-900"
      />
      <p className="form__row__error">
        {methods.formState.errors[props.name]?.message as string}
      </p>
    </div>
  );
};

export default InputField;
