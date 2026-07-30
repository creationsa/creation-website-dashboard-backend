import type { ReactNode } from "react";
import { EmptyIcon } from "../icons";

interface NoDataMessageProps {
  children: ReactNode;
  title: string;
  desc: string;
}

export default function NoDataMessage({
  children,
  title,
  desc,
}: NoDataMessageProps) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed">
      <EmptyIcon className="size-10 sm:size-14" />
      <h3 className="mt-2 text-xl font-semibold uppercase">{title}</h3>
      <p className="mt-2 mb-4 max-w-sm text-center text-sm text-gray-600 dark:text-gray-500">
        {desc}
      </p>
      {children}
    </div>
  );
}
