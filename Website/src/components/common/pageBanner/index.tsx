import Link from "next/link";
import { PageBannerProps } from "./types";

export default function PageBanner({
  pageTitle,
  home,
  titleCut,
}: PageBannerProps) {
  return (
    <section className="w-full border-b py-[120px]">
      <div className="container flex flex-col items-center gap-3 text-center font-semibold uppercase">
        <h1 className="font-head font-fancy text-3xl sm:text-5xl rtl:leading-12 sm:rtl:leading-18">
          {pageTitle}
        </h1>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:text-lg">
          <Link href="/" aria-label="Home page" className="text-gray-500">
            {home}
          </Link>
          <span className="bg-white-900 block h-0.5 w-4 sm:h-4 sm:w-0.5" />
          <span>{titleCut ? titleCut : pageTitle}</span>
        </div>
      </div>
    </section>
  );
}
