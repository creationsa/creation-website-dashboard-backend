import { LabelProps } from "./types";

export default function Label({ name, label, error, disabled }: LabelProps) {
  if (!label) return null;
  return (
    <label
      htmlFor={name}
      className={`${disabled ? "cursor-not-allowed" : ""} text-black-100 dark:text-white-100 mb-1.5 block ps-2.5 text-lg font-semibold tracking-wider capitalize md:text-xl`}
    >
      {label}
      {error && <span className="text-red-400 dark:text-red-500"> *</span>}
    </label>
  );
}
