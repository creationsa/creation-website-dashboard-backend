import Link from "next/link";
import { NavLinkItemProps } from "./types";

export default function NavLinkItem({
  href,
  label,
  isActive,
  onClick,
}: NavLinkItemProps) {
  return (
    <Link
      href={href}
      className={`block transition-colors lg:tracking-wider xl:tracking-widest ${
        isActive
          ? "text-tiffany-600 dark:text-tiffany-100"
          : "text-black-100 dark:text-white-100 hover:text-tiffany-600 dark:hover:text-tiffany-100"
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
