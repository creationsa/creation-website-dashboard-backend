import { NewsTickerProps } from "./types";

export default function NewsTicker({ items, noBackground }: NewsTickerProps) {
  const safeItems = Array.isArray(items) ? items : [items];

  if (!safeItems[0]) return null;

  return (
    <div className="relative h-12 w-full overflow-hidden sm:h-36">
      <div
        className={`flex h-full w-full items-center overflow-hidden ${
          !noBackground ? "bg-black-100 dark:bg-black-500" : ""
        }`}
      >
        <div className="ticker-track flex items-center justify-between gap-4">
          {[...safeItems, ...safeItems].map((item, index) => (
            <span
              key={index}
              className="text-tiffany-600 font-head font-fancy dark:text-tiffany-100 mx-2 shrink-0 text-lg font-semibold whitespace-nowrap uppercase sm:mx-4 sm:text-7xl ltr:tracking-[5px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
