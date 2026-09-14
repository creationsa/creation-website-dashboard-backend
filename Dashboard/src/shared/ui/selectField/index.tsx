import { useTheme } from "@/shared/hooks/useTheme";
import ReactSelect, { type MultiValue, type SingleValue } from "react-select";

import { FieldError } from "../textField/FieldError";
import Label from "../textField/Label";

import { buildSelectStyles, type SelectOption } from "./selectStyles";

interface BaseSelectFieldProps {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;

  options: SelectOption[];
}

interface SingleSelectFieldProps extends BaseSelectFieldProps {
  isMulti?: false;
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
}

interface MultiSelectFieldProps extends BaseSelectFieldProps {
  isMulti: true;
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
}

type SelectFieldProps = SingleSelectFieldProps | MultiSelectFieldProps;

export default function SelectField(props: SelectFieldProps) {
  const { name, label, error, disabled, placeholder, options } = props;
  const { theme } = useTheme();

  if (props.isMulti) {
    const selected = props.value
      .map((value) => options.find((option) => option.value === value))
      .filter((option): option is SelectOption => option !== undefined);

    return (
      <div className="w-full">
        <Label name={name} label={label} error={error} />

        <ReactSelect<SelectOption, true>
          inputId={name}
          isMulti
          options={options}
          isDisabled={disabled}
          styles={buildSelectStyles<true>(error, theme)}
          value={selected}
          onChange={(selectedOptions: MultiValue<SelectOption>) =>
            props.onChange(selectedOptions.map((option) => option.value))
          }
          placeholder={placeholder}
        />

        <FieldError message={error} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Label name={name} label={label} error={error} />

      <ReactSelect<SelectOption, false>
        inputId={name}
        options={options}
        isDisabled={disabled}
        styles={buildSelectStyles(error, theme)}
        value={options.find((option) => option.value === props.value) ?? null}
        onChange={(option: SingleValue<SelectOption>) =>
          props.onChange?.(option?.value)
        }
        placeholder={placeholder}
      />

      <FieldError message={error} />
    </div>
  );
}
