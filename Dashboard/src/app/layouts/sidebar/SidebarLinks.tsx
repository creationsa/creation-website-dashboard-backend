import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import type { SidebarLinksProps } from "../types";
import {
  ACTIVE_STYLES,
  ACTIVE_SUB_STYLES,
  INACTIVE_STYLES,
  INACTIVE_SUB_STYLES,
} from "./constants";
import { links } from "./links";

function SidebarLinks({ onNavigate }: SidebarLinksProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [manuallyToggledMenu, setManuallyToggledMenu] = useState<string | null>(
    () => {
      const initialActiveLink = links.find(
        (link) => link.activePrefix && pathname.startsWith(link.activePrefix),
      );
      return initialActiveLink ? initialActiveLink.href : null;
    },
  );

  const [closedMenus, setClosedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (href: string, isCurrentlyOpen: boolean) => {
    if (isCurrentlyOpen) {
      setClosedMenus((prev) => ({ ...prev, [href]: true }));
      if (manuallyToggledMenu === href) setManuallyToggledMenu(null);
    } else {
      setClosedMenus((prev) => ({ ...prev, [href]: false }));
      setManuallyToggledMenu(href);
    }
  };

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const hasSubmenu = Boolean(link.submenuItems?.length);

        const isParentActive = link.activePrefix
          ? pathname.startsWith(link.activePrefix)
          : pathname === link.href;

        if (hasSubmenu) {
          const isAutoOpen = isParentActive && !closedMenus[link.href];
          const isOpen = manuallyToggledMenu === link.href || isAutoOpen;

          return (
            <div
              key={link.href}
              className="border-white-500/20 dark:border-black-400/20 border-b"
            >
              <button
                type="button"
                onClick={() => toggleMenu(link.href, isOpen)}
                className={`flex w-full items-center justify-between p-3.75 transition-all duration-300 ${
                  isParentActive ? ACTIVE_STYLES : INACTIVE_STYLES
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon />
                  <span>{t(link.title)}</span>
                </div>
                <span
                  className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="my-2 ms-6 flex flex-col">
                  {link.submenuItems?.map((subItem) => (
                    <NavLink
                      key={subItem.href}
                      to={subItem.href}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm transition-all ${
                          isActive ? ACTIVE_SUB_STYLES : INACTIVE_SUB_STYLES
                        }`
                      }
                    >
                      {t(subItem.title)}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              `border-white-500/20 dark:border-black-400/20 flex items-center gap-2.5 border-b p-3.75 transition-colors duration-300 ${
                isActive ? ACTIVE_STYLES : INACTIVE_STYLES
              }`
            }
          >
            <Icon />
            <span>{t(link.title)}</span>
          </NavLink>
        );
      })}
    </>
  );
}

export default memo(SidebarLinks);
