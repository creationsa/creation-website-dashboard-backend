import { useTheme } from "@/shared/hooks/useTheme";
import ReactSelect, { type SingleValue } from "react-select";

import { FieldError } from "../textField/FieldError";
import Label from "../textField/Label";

import { buildSelectStyles, type SelectOption } from "./selectStyles";

interface SelectFieldProps {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;

  options: SelectOption[];

  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
}

export default function SelectField({
  name,
  label,
  error,
  disabled,
  placeholder,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} />

      <ReactSelect<SelectOption, false>
        inputId={name}
        options={options}
        isDisabled={disabled}
        styles={buildSelectStyles(error, theme)}
        value={options.find((option) => option.value === value) ?? null}
        onChange={(option: SingleValue<SelectOption>) =>
          onChange?.(option?.value)
        }
        placeholder={placeholder}
      />

      <FieldError message={error} />
    </div>
  );
}
