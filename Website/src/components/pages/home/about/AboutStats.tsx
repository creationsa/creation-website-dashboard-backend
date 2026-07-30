import { STATS } from "./statisticsData";
import StatItem from "./StatItem";
import { AboutStatsProps } from "./types";

export default function AboutStats({ about, locale }: AboutStatsProps) {
  return (
    <div className="dark:bg-black-800 bg-white-200 flex h-full w-fit flex-col gap-4 p-10">
      <div className="grid grid-cols-2 gap-6 sm:gap-10">
        {STATS.map((stat) => (
          <StatItem key={stat.value} {...stat} about={about} locale={locale} />
        ))}
      </div>

      <div className="border-t" />

      <p className="max-w-[466px]">{about.vision}</p>
    </div>
  );
}
