import { InputProps } from "../types";
import { FieldError } from "./FieldError";
import Label from "./Label";
import { STANDARD_STYLES } from "./variationStyles";

export default function Input({
  name,
  label,
  error,
  disabled,
  register,
  ...rest
}: InputProps) {
  const Styles = error ? STANDARD_STYLES.error : STANDARD_STYLES.default;

  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} disabled={disabled} />

      <input
        {...rest}
        {...(register ? register : {})}
        id={name}
        className={`input h-[60px] rounded-br-xl rounded-bl-xl ${disabled ? "cursor-not-allowed bg-blue-100! dark:bg-blue-500!" : ""} ${Styles}`}
        disabled={disabled}
      />

      <FieldError message={error} />
    </div>
  );
}
