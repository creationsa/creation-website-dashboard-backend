import { LanguageType } from "@/i18n.config";
import Link from "next/link";
import CreationArLogo from "./CreationArLogo";
import CreationEnLogo from "./CreationEnLogo";

interface LogoProps {
  locale: LanguageType;
}

export default function Logo({ locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} aria-label="Homepage">
      {locale === "en" ? (
        <CreationEnLogo className="text-black-800 dark:text-white-100 h-auto w-[140px] 2xl:w-48" />
      ) : (
        <CreationArLogo className="text-black-800 dark:text-white-100 h-auto w-[140px] 2xl:w-48" />
      )}
    </Link>
  );
}
