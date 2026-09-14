import { formatNumber } from "./numberFormat";
import ProjectCard from "./ProjectCard";
import SolutionInfo from "./SolutionInfo";
import { SolutionItemProps } from "./types";

export default function SolutionItem({
  block,
  index,
  total,
  locale,
}: SolutionItemProps) {
  const current = formatNumber(index + 1);
  const totalFormatted = formatNumber(total);

  return (
    <div className="flex flex-col gap-8 border-b last:border-0 sm:pb-10 sm:last:border-b lg:grid xl:grid-cols-3">
      <SolutionInfo
        locale={locale}
        current={current}
        total={totalFormatted}
        left_block={block.left}
      />

      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-x-visible xl:contents">
        <ProjectCard
          project_details={block.first_right}
          locale={locale}
          description={block.first_right_card_desc}
        />

        <ProjectCard
          project_details={block.second_right}
          locale={locale}
          description={block.second_right_card_desc}
        />
      </div>
    </div>
  );
}
