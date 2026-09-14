import { FieldError } from "./FieldError";
import Label from "./Label";
import { TextAreaProps } from "./types";
import { STANDARD_STYLES } from "./variationStyles";

export default function TextArea({
  name,
  label,
  error,
  disabled,
  register,
  ...rest
}: TextAreaProps) {
  const Styles = error ? STANDARD_STYLES.error : STANDARD_STYLES.default;
  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} disabled={disabled} />

      <textarea
        {...rest}
        {...(register ? register : {})}
        id={name}
        className={`input w-full ps-2.5 pt-2 outline-none ${disabled ? "cursor-not-allowed bg-blue-100! dark:bg-blue-500!" : ""} ${Styles} resize-none rounded-br-xl rounded-bl-xl`}
        disabled={disabled}
      />

      <FieldError message={error} />
    </div>
  );
}
