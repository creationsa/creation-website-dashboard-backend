import CountUp from "@/components/ui/CountUp";
import { StatItemProps } from "./types";

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 xl:gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-medium sm:text-4xl xl:text-6xl">
          <CountUp value={value} />
        </span>
        <span className="text-xs uppercase sm:text-sm xl:text-lg">
          {label}
        </span>
      </div>
    </div>
  );
}
