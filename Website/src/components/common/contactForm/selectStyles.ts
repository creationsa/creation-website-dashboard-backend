import { StylesConfig } from "react-select";
import { Option } from "./types";

export function buildSelectStyles(
  error?: string,
  theme?: string,
): StylesConfig<Option> {
  const isDark = theme === "dark";

  const borderColor = error
    ? isDark
      ? "var(--color-red-700)"
      : "var(--color-red-400)"
    : isDark
      ? "var(--color-border-900)"
      : "var(--color-border-800)";

  const textColor = isDark
    ? "var(--color-white-100)"
    : "var(--color-black-100)";

  const placeholderColor = isDark
    ? "var(--color-gray-900)"
    : "var(--color-gray-200)";

  const backgroundColor = isDark
    ? "var(--color-black-700)"
    : "var(--color-white-300)";

  const activeColor = isDark
    ? "var(--color-tiffany-100)"
    : "var(--color-tiffany-600)";

  return {
    control: (base) => ({
      ...base,
      border: "none",
      borderBottom: `2px solid ${borderColor}`,
      boxShadow: "none",
      "&:hover": { borderColor: "none" },
      width: "100%",
      height: "60px",
      backgroundColor: "transparent",
      color: textColor,
      outline: "none",
      overflowY: "auto",
      cursor: "pointer",
      borderRadius: "12px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: placeholderColor,
      "&:hover": { color: activeColor },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: placeholderColor,
      "&:hover": { color: activeColor },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    noOptionsMessage: (base) => ({ ...base, color: textColor }),
    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      overflowY: "auto",
      backgroundColor,
      border: `1px solid ${borderColor}`,
      padding: "0px",
    }),
    input: (base) => ({ ...base, color: textColor }),
    placeholder: (base) => ({
      ...base,
      color: placeholderColor,
      fontSize: "14px",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? isDark
          ? "var(--color-black-500)"
          : "var(--color-white-600)"
        : state.isFocused
          ? isDark
            ? "var(--color-black-700)"
            : "var(--color-white-300)"
          : undefined,
      color: state.isSelected
        ? isDark
          ? "var(--color-tiffany-100)"
          : "var(--color-tiffany-700)"
        : state.isFocused
          ? isDark
            ? "var(--color-tiffany-100)"
            : "var(--color-tiffany-600)"
          : isDark
            ? "var(--color-tiffany-300)"
            : "var(--color-tiffany-800)",
      "&:hover": state.isSelected
        ? {}
        : {
            backgroundColor: isDark
              ? "var(--color-black-600)"
              : "var(--color-white-400)",
            color: isDark
              ? "var(--color-tiffany-200)"
              : "var(--color-tiffany-700)",
          },
    }),
    valueContainer: (base) => ({ ...base, padding: "0 10px" }),
    singleValue: (base) => ({ ...base, color: textColor }),
  };
}
