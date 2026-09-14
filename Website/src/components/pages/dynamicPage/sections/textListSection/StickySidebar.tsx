import MainTitle from "@/components/ui/MainTitle";
import { StickySidebarProps } from "./types";

export default function StickySidebar({
  sectionsLabel,
  stickyDescription,
  items,
}: StickySidebarProps) {
  return (
    <aside className="flex flex-col gap-15 lg:sticky lg:top-5 lg:w-[60%]">
      {stickyDescription && <p>{stickyDescription}</p>}

      <div className="flex flex-col gap-3">
        <MainTitle title={sectionsLabel} />

        <ol className="flex flex-col gap-1.5">
          {items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="text-tiffany-600 dark:text-tiffany-100 flex items-center gap-1.5 uppercase"
            >
              <span className="text-sm">
                ({String(itemIndex + 1).padStart(2, "0")})
              </span>
              <p>{item.header}</p>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
