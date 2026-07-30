import type { LabelProps } from "./types";

export default function Label({ name, label, error }: LabelProps) {
  if (!label) return null;
  return (
    <label
      htmlFor={name}
      className="mb-1.5 block ps-2.5 text-lg font-semibold tracking-wider text-gray-600 capitalize dark:text-gray-500"
    >
      {label}
      {error && <span className="text-red-400 dark:text-red-700"> *</span>}
    </label>
  );
}
