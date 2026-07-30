import { ArchitectureCornerLabelsProps } from "./types";

export default function ArchitectureCornerLabels({
  architecture,
}: ArchitectureCornerLabelsProps) {
  return (
    <div className="absolute top-0 z-10 container flex h-fit items-center justify-between gap-2 text-xs sm:relative sm:text-base">
      <span className="flex flex-col gap-0.5 font-light uppercase sm:gap-1 sm:tracking-wide">
        <span>{architecture.regional_heritage}</span>
        <span>{architecture.global_equity}</span>
      </span>
      <span className="flex flex-col gap-0.5 text-end font-light uppercase sm:gap-1 sm:tracking-wide">
        <span>{architecture.talk_logic}</span>
        <span>{architecture.culture_design}</span>
      </span>
    </div>
  );
}
