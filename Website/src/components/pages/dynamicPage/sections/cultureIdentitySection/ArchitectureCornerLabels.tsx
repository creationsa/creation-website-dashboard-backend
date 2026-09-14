import { ArchitectureCornerLabelsProps } from "./types";

export default function ArchitectureCornerLabels({
  topLeftText,
  topLeftSecondText,
  topRightText,
  topRightSecondText,
}: ArchitectureCornerLabelsProps) {
  return (
    <div className="absolute top-0 z-10 container flex h-fit items-center justify-between gap-2 text-xs sm:relative sm:text-base">
      <span className="flex flex-col gap-0.5 font-light uppercase sm:gap-1 sm:tracking-wide">
        <span>{topLeftText}</span>
        <span>{topLeftSecondText}</span>
      </span>
      <span className="flex flex-col gap-0.5 text-end font-light uppercase sm:gap-1 sm:tracking-wide">
        <span>{topRightText}</span>
        <span>{topRightSecondText}</span>
      </span>
    </div>
  );
}
