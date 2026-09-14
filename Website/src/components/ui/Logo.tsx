import { LanguageType } from "@/i18n.config";
import Link from "next/link";
import DynamicSvg from "./DynamicSvg";

interface LogoProps {
  locale: LanguageType;
  logoUrl?: string | null;
  logoAlt?: string;
}

export default function Logo({ locale, logoUrl, logoAlt }: LogoProps) {
  if (!logoUrl) return null;

  return (
    <Link href={`/${locale}`} aria-label={logoAlt} className="w-fit">
      <DynamicSvg
        src={logoUrl}
        title={logoAlt}
        className="svg-logo-wrapper svg-logo h-auto w-[140px] 2xl:w-48"
      />
    </Link>
  );
}
