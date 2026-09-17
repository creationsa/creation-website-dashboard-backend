import Logo from "@/components/ui/Logo";
import { getHeader } from "@/lib/api/getHeader";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import DesktopNavLinks from "./DesktopNavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const locale = await getCurrentLocale();
  const nav = await getTrans(locale, "nav");

  const header = await getHeader(locale).catch(() => null);
  const showLanguageSwitch = header?.show_language_switch ?? true;
  const showThemeSwitch = header?.show_theme_switch ?? false;

  return (
    <header className="h-[100px]">
      <nav
        className="container flex items-center justify-between py-8"
        aria-label="Main Navigation"
      >
        {/* LOGO */}
        <Logo
          locale={locale}
          logoUrl={header?.logo}
          logoAlt={header?.logo_alt}
        />

        {/* DESKTOP MENU */}
        <DesktopNavLinks locale={locale} menuItems={header?.menu_items ?? []} />

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showLanguageSwitch && <LanguageSwitcher nav={nav} />}
          {showThemeSwitch && <ThemeToggle />}

          {/* MOBILE MENU */}
          <MobileMenu
            locale={locale}
            logoUrl={header?.logo}
            logoAlt={header?.logo_alt}
            menuItems={header?.menu_items ?? []}
            copyrightItems={header?.copyright_items ?? []}
          />
        </div>
      </nav>
    </header>
  );
}
