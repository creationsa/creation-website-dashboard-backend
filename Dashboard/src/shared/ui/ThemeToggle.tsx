import { useTheme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "../icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="text-xl sm:text-2xl md:text-3xl"
    >
      {theme === "dark" ? (
        <SunIcon className="text-white-100 size-6 sm:size-8" />
      ) : (
        <MoonIcon className="text-black-100 size-6 sm:size-8" />
      )}
    </button>
  );
}
