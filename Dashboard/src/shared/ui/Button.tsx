import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

const sizeStyles = {
  small: "px-2 py-1 text-xs sm:text-sm",
  medium: "px-3 py-2 text-sm sm:text-base",
  large: "px-4 py-3 text-lg sm:text-xl",
  actions: "px-[5px] !text-xs sm:!text-sm !w-fit !min-h-[30px]",
};

type AppButtonProps = {
  label?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  replace?: boolean;
  size?: keyof typeof sizeStyles;
  variation?: "primary" | "secondary" | "delete" | "danger";
  disabled?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  label,
  href,
  children,
  className = "",
  replace,
  size = "medium",
  variation = "primary",
  disabled,
  loading,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles = ` w-full rounded-xl relative
   transition-colors duration-200 font-bold cursor-pointer text-center uppercase
  ${(disabled || loading) && "cursor-not-allowed! opacity-50!"}`;

  const styles = {
    primary: `bg-tiffany-600 dark:bg-tiffany-100 text-white-100 dark:text-black-100 border border-tiffany-600 dark:border-tiffany-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tiffany-600 dark:focus-visible:outline-tiffany-100
      ${!disabled && !loading && "hover:bg-tiffany-600/95 dark:hover:bg-tiffany-100/95 active:bg-tiffany-600/95 dark:active:bg-tiffany-100/95"}`,
    secondary: `bg-transparent text-tiffany-600 dark:text-tiffany-100 border border-tiffany-600 dark:border-tiffany-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tiffany-600 dark:focus-visible:outline-tiffany-100
    ${!disabled && !loading && "hover:bg-tiffany-600 dark:hover:bg-tiffany-100 hover:text-white-100 dark:hover:text-black-100"}`,
    delete: `bg-red-400 dark:bg-red-500 text-white-100 border border-red-400 dark:border-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 dark:focus-visible:outline-red-500
      ${!disabled && !loading && "hover:bg-red-400/90 dark:hover:bg-red-500/90 active:bg-red-400/90 dark:active:bg-red-500/90"}`,
    danger: `bg-transparent text-red-400 dark:text-red-500 border border-red-400 dark:border-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 dark:focus-visible:outline-red-500
      ${!disabled && !loading && "hover:bg-red-400 dark:hover:bg-red-500 hover:text-white-100 "}`,
  };

  const combinedStyles = `${sizeStyles[size]} ${baseStyles} ${styles[variation]} ${className}`;

  if (href) {
    return (
      <Link
        to={href}
        replace={replace}
        aria-label={label}
        className={combinedStyles}
      >
        {children || label}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props} disabled={isDisabled}>
      {children || label}
    </button>
  );
}
