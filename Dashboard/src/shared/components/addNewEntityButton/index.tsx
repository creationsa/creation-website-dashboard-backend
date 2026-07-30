import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { AddNewButtonProps } from "./types";

export default function AddNewButton({
  resource,
  position = "center",
}: AddNewButtonProps) {
  const { href, titleKey } = resource;
  const { t } = useTranslation();

  const label = t("general.add_title", {
    title: t(titleKey),
  });

  const alignmentClass = position === "center" ? "mx-auto" : "ms-auto";

  return (
    <Button
      aria-label={label}
      href={href}
      className={`mb-4 block w-full sm:w-44 ${alignmentClass}`}
    >
      {label}
    </Button>
  );
}
