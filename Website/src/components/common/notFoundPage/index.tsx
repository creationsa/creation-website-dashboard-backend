import AppButton from "@/components/ui/AppButton";
import Link from "next/link";
import { NotFoundPageProps } from "./types";
import { RightArrowIcon } from "@/icons";

export default function NotFoundPage({
  title,
  description,
  backToHome,
  number,
  locale,
  hasSecondButton = false,
  secondButtonTitle,
  secondButtonHref,
}: NotFoundPageProps) {
  return (
    <section className="container mt-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold">{number}</h1>

      <h2 className="font-head font-fancy uppercase">{title}</h2>

      <p className="mt-4 mb-8 text-gray-600 dark:text-gray-500">
        {description}
      </p>

      <div
        className={`${hasSecondButton ? "flex flex-col items-center justify-between gap-4 sm:flex-row" : ""}`}
      >
        {hasSecondButton && secondButtonHref && secondButtonTitle && (
          <Link
            replace
            href={secondButtonHref}
            aria-label={secondButtonTitle}
            className="hover:text-tiffany-600 hover:dark:text-tiffany-100 flex items-center gap-1"
          >
            {secondButtonTitle}
            <RightArrowIcon className="size-4 sm:size-6 rtl:rotate-180" />
          </Link>
        )}
        <AppButton href={`/${locale}`} label={backToHome} replace>
          {backToHome}
        </AppButton>
      </div>
    </section>
  );
}
