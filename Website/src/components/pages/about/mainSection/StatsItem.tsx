import { StatItemProps } from "../types";

export default function StatsItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-2xl font-semibold md:text-4xl">{value}</span>
      <h6 className="text-sm text-gray-600 uppercase md:text-base dark:text-gray-500">
        {label}
      </h6>
    </div>
  );
}
