import { ErrorProps } from "./types";

export function FieldError({ message }: ErrorProps) {
  if (!message) return null;

  return (
    <div className="mt-2 ps-2.5 text-xs text-red-400 dark:text-red-500">
      {message}
    </div>
  );
}
