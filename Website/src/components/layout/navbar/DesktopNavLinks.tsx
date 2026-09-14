"use client";

import { usePathname } from "next/navigation";
import NavLinkItem from "./NavLinkItem";
import { DesktopNavLinksProps } from "./types";

export default function DesktopNavLinks({
  locale,
  menuItems,
}: DesktopNavLinksProps) {
  const pathname = usePathname();

  const pathnameWithoutLocale = pathname?.replace(`/${locale}`, "") || "/";

  return (
    <ul className="hidden text-lg font-semibold uppercase lg:flex lg:items-center lg:gap-8 xl:gap-12">
      {menuItems?.map(({ key, href, label }) => {
        const linkPath = href.replace(`/${locale}`, "") || "/";
        const isActive =
          pathnameWithoutLocale === linkPath ||
          pathnameWithoutLocale.startsWith(linkPath + "/");

        return (
          <li key={key}>
            <NavLinkItem
              href={`/${locale}/${href}`}
              label={label}
              isActive={isActive}
            />
          </li>
        );
      })}
    </ul>
  );
}
