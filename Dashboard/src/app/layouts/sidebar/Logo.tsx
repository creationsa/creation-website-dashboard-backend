import { Link } from "react-router-dom";
import CreationArLogo from "@/assets/CreationArLogo";
import CreationEnLogo from "@/assets/CreationEnLogo";
import { useLanguage } from "@/shared/hooks/useLanguage";
import type { LogoProps } from "../types";

export default function Logo({ onClose }: LogoProps) {
  const currentLanguage = useLanguage();

  return (
    <Link
      to="/"
      aria-label="Homepage"
      className="flex items-center justify-center"
      onClick={onClose}
    >
      {currentLanguage === "en" ? (
        <CreationEnLogo className="text-black-800 dark:text-white-100 h-17.5 w-35 2xl:w-48" />
      ) : (
        <CreationArLogo className="text-black-800 dark:text-white-100 h-17.5 w-35 2xl:w-48" />
      )}
    </Link>
  );
}
