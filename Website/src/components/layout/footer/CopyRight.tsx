import { CopyRightProps } from "./types";

export default function CopyRight({ footer }: CopyRightProps) {
  const text = footer.rights_reserved.replace(
    "{{year}}",
    new Date().getFullYear().toString(),
  );

  return (
    <div className="flex flex-col justify-between gap-3 py-[30px] sm:flex-row sm:gap-2">
      <span className="block text-sm sm:text-base">{text}</span>

      <span className="text-sm text-gray-600 dark:text-gray-500">
        {footer.terms_Policy}
      </span>
    </div>
  );
}
