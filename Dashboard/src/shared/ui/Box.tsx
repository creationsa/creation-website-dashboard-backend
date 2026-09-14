import type { ReactNode } from "react";

interface BoxProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Box({ title, children, className = "" }: BoxProps) {
  return (
    <section
      className={`relative rounded-xl border p-6 shadow-md ${title ? "pt-8" : ""} ${className}`}
    >
      {title && (
        <span className="bg-white-200 dark:bg-black-800 absolute inset-s-6 -top-5 px-2 py-1 text-2xl font-semibold uppercase">
          {title}
        </span>
      )}

      {children}
    </section>
  );
}
