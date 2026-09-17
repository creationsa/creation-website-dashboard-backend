import CopyrightItemsList from "@/components/common/copyrightItemsList";
import { CopyRightProps } from "./types";

export default function CopyRight({ locale, data }: CopyRightProps) {
  const text = (data?.copyright_text ?? "").replace(
    "{{year}}",
    new Date().getFullYear().toString(),
  );

  const items = data?.copyright_items ?? [];

  return (
    <div className="flex flex-col justify-between gap-3 py-[30px] sm:flex-row sm:gap-2">
      <span className="block text-sm sm:text-base">{text}</span>

      <CopyrightItemsList items={items} locale={locale} />
    </div>
  );
}
