"use client";

import Logo from "@/components/ui/Logo";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CloseIcon, HamburgerIcon } from "@/icons";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavLinkItem from "./NavLinkItem";
import { NAV_LINKS } from "./navLinks";
import { NavLinksProps } from "./types";

export default function MobileMenu({ locale, nav }: NavLinksProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const toggleSidebar = () => setOpen((prev) => !prev);

  const closeMenu = () => setOpen(false);

  const menuRef = useOutsideClick<HTMLDivElement>(closeMenu);

  return (
    <>
      <button
        aria-label="Toggle-menu"
        title="Toggle menu"
        className="border-border-800! dark:border-border-900! dark:hover:text-black-100 hover:text-white-100 text-tiffany-600 hover:bg-tiffany-600 dark:text-tiffany-100 dark:hover:bg-tiffany-100 rounded-full border p-1 transition-all lg:hidden"
        onClick={toggleSidebar}
      >
        <HamburgerIcon />
      </button>

      {open && (
        <div className="lg:hidden">
          {/* OVERLAY */}
          <div className="fixed inset-0 z-100 h-full w-full bg-black/40 backdrop-blur-sm dark:bg-black/10" />

          {/* Mobile Menu Overlay */}
          <nav
            ref={menuRef}
            className="bg-white-100 dark:bg-black-800 fixed end-0 bottom-0 z-101 flex h-full w-full flex-col gap-4 shadow-md drop-shadow-xl sm:w-[300px]"
          >
            {/* CLOSE SIDEBAR BUTTON*/}
            <div className="flex h-20 items-center justify-end px-2.5">
              <button aria-label="Close-icon" title="Close" onClick={closeMenu}>
                <div className="flex items-center justify-center p-1">
                  <CloseIcon />
                </div>
              </button>
            </div>

            {/* LINKS */}
            <ul className="flex flex-1 flex-col gap-4 px-4 text-lg font-semibold uppercase">
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
                      onClick={closeMenu}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="border-border-800 dark:border-border-900 mt-auto flex flex-col items-center gap-6 border-t py-6">
              <Logo locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
