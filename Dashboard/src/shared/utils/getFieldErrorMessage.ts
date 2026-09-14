import type { FieldErrors, FieldValues } from "react-hook-form";

/*
 * Get the error message for a specific field path from the form errors.
 */
export function getFieldErrorMessage(
  errors: FieldErrors<FieldValues>,
  path: string,
): string | undefined {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      errors,
    );

  if (
    value &&
    typeof value === "object" &&
    "message" in value &&
    typeof (value as { message?: unknown }).message === "string"
  ) {
    return (value as { message: string }).message;
  }

  return undefined;
}
