"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type AppButtonProps = {
  label?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  replace?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AppButton({
  label,
  href,
  children,
  className = "",
  replace,
  ...props
}: AppButtonProps) {
  const baseStyles =
    "hover:dark:text-black-100 hover:text-white-100 border-tiffany-600 text-tiffany-600 hover:bg-tiffany-600 dark:border-tiffany-100 dark:text-tiffany-100 dark:hover:bg-tiffany-100 w-fit rounded-xl border px-4 py-2 text-lg uppercase transition-colors duration-200 ";

  const combinedStyles = `${baseStyles} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        replace={replace}
        aria-label={label}
        className={combinedStyles}
      >
        {children || label}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children || label}
    </button>
  );
}
