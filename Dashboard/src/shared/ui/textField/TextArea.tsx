import { useTranslation } from "react-i18next";
import { FieldError } from "./FieldError";
import Label from "./Label";
import type { TextAreaProps } from "./types";
import { STANDARD_STYLES } from "./variationStyles";

export default function TextArea({
  name,
  label,
  error,
  disabled,
  register,
  rows = 8,
  placeholder,
  ...rest
}: TextAreaProps) {
  const { t } = useTranslation();

  const Styles = error ? STANDARD_STYLES.error : STANDARD_STYLES.default;
  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} />

      <textarea
        {...rest}
        {...(register ? register : {})}
        id={name}
        className={`input hide-scrollbar w-full resize-none overflow-y-auto rounded-xl px-2.5 py-2 placeholder-gray-900 outline-none dark:placeholder-gray-100 ${disabled ? "cursor-not-allowed bg-gray-100! text-gray-900! dark:bg-gray-900! dark:text-gray-100!" : Styles} `}
        disabled={disabled}
        dir="auto"
        rows={rows}
        placeholder={
          placeholder ||
          t("general.placeholder", {
            name: label,
          })
        }
      />

      <FieldError message={error} />
    </div>
  );
}
