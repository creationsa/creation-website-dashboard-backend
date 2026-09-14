import { NewsProps } from "./types";

export default function News({
  data,
  hasContainer = false,
  hasBorder = false,
}: NewsProps) {
  const safeItems = Array.isArray(data) ? data : [data];

  if (!safeItems[0]) return null;
  return (
    <section className={`${hasContainer ? "container" : ""}`}>
      <div
        className={`relative w-full overflow-hidden ${hasBorder ? "h-full" : "h-12 sm:h-36"}`}
      >
        <div className="flex h-full w-full items-center overflow-hidden">
          <div
            className={`ticker-track flex items-center justify-between ${hasBorder ? "gap-5 md:gap-6 lg:gap-10" : "gap-4"}`}
          >
            {[...safeItems, ...safeItems].map((item, index) => (
              <span
                key={index}
                className={`text-tiffany-600 font-head font-fancy dark:text-tiffany-100 font-semibold whitespace-nowrap uppercase ${hasBorder ? "border-tiffany-600 dark:border-tiffany-100 rounded-full border-2 p-4 text-xl md:p-6 md:text-3xl lg:p-8 lg:text-5xl" : "mx-2 shrink-0 text-lg sm:mx-4 sm:text-7xl ltr:tracking-[5px]"}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
