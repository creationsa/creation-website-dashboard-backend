"use client";

import { Languages } from "@/constants/enums";
import { useParams, usePathname, useRouter } from "next/navigation";
import { LanguageSwitcherProps } from "./types";

export default function LanguageSwitcher({ nav }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="hover:text-tiffany-600 dark:hover:text-tiffany-100 flex text-sm font-semibold sm:text-base">
      {locale === Languages.ARABIC ? (
        <button
          onClick={() => switchLanguage(Languages.ENGLISH)}
          aria-label={nav.english_language}
          title={nav.english_language}
        >
          English
        </button>
      ) : (
        <button
          onClick={() => switchLanguage(Languages.ARABIC)}
          aria-label={nav.arabic_language}
          title={nav.arabic_language}
        >
          العربية
        </button>
      )}
    </div>
  );
}
