import { SolutionsTickerProps } from "../types";

export default function SolutionsTicker({ news }: SolutionsTickerProps) {
  return (
    <section>
      <div className="relative h-full w-full overflow-hidden">
        <div className="flex h-full w-full items-center overflow-hidden">
          <div className="ticker-track flex items-center justify-between gap-5 md:gap-6 lg:gap-10">
            {[...news.items, ...news.items].map((item, index) => (
              <span
                key={index}
                className="border-tiffany-600 text-tiffany-600 dark:border-tiffany-100 dark:text-tiffany-100 rounded-full border-2 p-4 text-xl font-semibold whitespace-nowrap uppercase md:p-6 md:text-3xl lg:p-8 lg:text-5xl"
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
