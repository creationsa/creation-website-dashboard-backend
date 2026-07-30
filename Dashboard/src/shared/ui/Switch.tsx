import { FieldError } from "./textField/FieldError";
import Label from "./textField/Label";
import { STANDARD_STYLES } from "./textField/variationStyles";

interface SwitchProps {
  name: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  containerStyles?: string;
  checkedText: string;
  uncheckedText: string;
}

export default function Switch({
  name,
  label,
  checked,
  onChange,
  disabled = false,
  error,
  containerStyles = "w-full",
  checkedText,
  uncheckedText,
}: SwitchProps) {
  const Styles = error ? STANDARD_STYLES.error : STANDARD_STYLES.default;

  return (
    <div className={`${containerStyles}`}>
      <Label name={name} label={label} error={error} />

      <div
        className={`flex items-center justify-between rounded-xl border p-2.5 transition-colors duration-300 ${disabled ? "cursor-not-allowed bg-gray-100! text-gray-900! dark:bg-gray-900! dark:text-gray-100!" : Styles}`}
      >
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {checked ? checkedText : uncheckedText}
          </p>
        </div>

        <button
          id={name}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
            checked
              ? "bg-tiffany-600 dark:bg-tiffany-100"
              : "bg-gray-600 dark:bg-gray-500"
          } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} `}
        >
          <span
            className={`bg-white-200 dark:bg-black-800 absolute top-1 size-6 rounded-full shadow-md transition-all duration-300 ${checked ? "inset-e-1" : "inset-s-1"} `}
          />
        </button>
      </div>

      <FieldError message={error} />
    </div>
  );
}
