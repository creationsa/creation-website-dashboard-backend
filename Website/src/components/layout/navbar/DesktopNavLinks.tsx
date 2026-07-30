"use client";

import { usePathname } from "next/navigation";
import NavLinkItem from "./NavLinkItem";
import { NAV_LINKS } from "./navLinks";
import { DesktopNavLinksProps } from "./types";

export default function DesktopNavLinks({ locale, nav }: DesktopNavLinksProps) {
  const pathname = usePathname();

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <ul className="hidden text-lg font-semibold uppercase lg:flex lg:items-center lg:gap-8 xl:gap-12">
      {NAV_LINKS.map((link) => {
        const isActive =
          pathnameWithoutLocale === link.href ||
          pathnameWithoutLocale.startsWith(link.href + "/");

        return (
          <li key={link.href}>
            <NavLinkItem
              href={`/${locale}${link.href}`}
              label={nav[link.label]}
              isActive={isActive}
            />
          </li>
        );
      })}
    </ul>
  );
}
