import { DashboardIcon } from "@/icons";
import Link from "next/link";
import NavLink from "./NavLink";
import { NavigationProps } from "./types";

export default function Navigation({
  locale,
  basePath,
  previousLabel,
  nextLabel,
  prevItem,
  nextItem,
}: NavigationProps) {
  const isRTL = locale === "ar";

  return (
    <section className="container">
      <div className="flex flex-row justify-between gap-6 text-start">
        {/* Previous Link */}
        <NavLink
          href={`/${locale}/${basePath}/${prevItem.slug}`}
          label={previousLabel}
          title={prevItem.title}
          image={prevItem.image}
          isRTL={isRTL}
          type="prev"
        />

        {/* Center Dashboard Icon */}
        <Link
          href={`/${locale}/${basePath}`}
          className="flex w-[10%] justify-center text-2xl text-gray-600 sm:text-4xl dark:text-gray-400"
        >
          <DashboardIcon className="size-6 sm:size-8" />
        </Link>

        {/* Next Link */}
        <NavLink
          href={`/${locale}/${basePath}/${nextItem.slug}`}
          label={nextLabel}
          title={nextItem.title}
          image={nextItem.image}
          isRTL={isRTL}
          type="next"
        />
      </div>
    </section>
  );
}
