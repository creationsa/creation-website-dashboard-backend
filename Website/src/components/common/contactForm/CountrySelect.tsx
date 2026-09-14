"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { FieldError } from "./FieldError";
import { fetchCountries } from "./fetchCountries";
import { buildSelectStyles } from "./selectStyles";
import { CountrySelectProps, Option } from "./types";

export default function CountrySelect({
  name,
  error,
  disabled,
  control,
  locale,
  placeholder,
}: CountrySelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    fetchCountries(locale)
      .then((data) => {
        const filtered = data.filter((country) => {
          const label = country.label.trim().toLowerCase();
          const value = country.value?.toLowerCase();

          return !["israel", "إسرائيل"].includes(label) && value !== "il";
        });

        setOptions(filtered);
      })
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect<Option>
            {...field}
            inputId={name}
            options={options}
            isDisabled={disabled || loading}
            isLoading={loading}
            styles={buildSelectStyles(error, resolvedTheme)}
            value={options.find((o) => o.value === field.value) ?? null}
            onChange={(opt) => field.onChange(opt?.value ?? "")}
            placeholder={placeholder}
          />
        )}
      />
      <FieldError message={error} />
    </>
  );
}
