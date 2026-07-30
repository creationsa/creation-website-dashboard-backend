import { useTranslation } from "react-i18next";
import { FieldError } from "./FieldError";
import Label from "./Label";
import type { InputProps } from "./types";
import { STANDARD_STYLES } from "./variationStyles";

export default function Input({
  name,
  label,
  error,
  disabled,
  register,
  placeholder,
  ...rest
}: InputProps) {
  const { t } = useTranslation();
  const Styles = error ? STANDARD_STYLES.error : STANDARD_STYLES.default;

  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} />

      <input
        {...rest}
        {...(register ? register : {})}
        id={name}
        className={`input h-15 rounded-xl placeholder-gray-900 dark:placeholder-gray-100 ${disabled ? "cursor-not-allowed bg-gray-100! text-gray-900! dark:bg-gray-900! dark:text-gray-100!" : Styles}`}
        // dir="auto"
        placeholder={
          placeholder ||
          t("general.placeholder", {
            name: label,
          })
        }
        disabled={disabled}
      />

      <FieldError message={error} />
    </div>
  );
}
