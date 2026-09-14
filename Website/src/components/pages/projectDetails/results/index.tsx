import CountUp from "@/components/ui/CountUp";
import { ResultsProps } from "../types";

export default function Results({ data }: ResultsProps) {
  return (
    <section className="container">
      <h1 className="mb-6 pb-4 text-4xl uppercase lg:text-5xl xl:text-6xl">
        {data.stats_title}
      </h1>

      <div className="flex flex-col items-start justify-between gap-4 uppercase sm:flex-row sm:items-center">
        {data.stats.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <span className="text-4xl font-semibold">
              <CountUp value={item.value} />
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
