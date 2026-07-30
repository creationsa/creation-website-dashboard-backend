import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Logo from "../../ui/Logo";
import DesktopNavLinks from "./DesktopNavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
// import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const locale = await getCurrentLocale();
  const nav = await getTrans(locale, "nav");

  return (
    <header className="h-[100px]">
      <nav
        className="container flex items-center justify-between py-8"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <Logo locale={locale} />

        {/* DESKTOP LINKS */}
        <DesktopNavLinks nav={nav} locale={locale} />

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher nav={nav} />
          {/* <ThemeToggle /> */}

          {/* Mobile Menu Icon */}
          <MobileMenu nav={nav} locale={locale} />
        </div>
      </nav>
    </header>
  );
}
