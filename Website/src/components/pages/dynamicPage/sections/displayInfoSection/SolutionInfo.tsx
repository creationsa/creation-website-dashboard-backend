import AppButton from "@/components/ui/AppButton";
import SolutionNumber from "./SolutionNumber";
import { SolutionInfoProps } from "./types";

export default function SolutionInfo({
  locale,
  current,
  total,
  left_block,
}: SolutionInfoProps) {
  return (
    <div className="flex flex-col xl:col-span-1 xl:border-e xl:pe-10">
      <SolutionNumber current={current} total={total} />

      <div className="flex flex-1 flex-col justify-center gap-4">
        <h3 className="text-3xl leading-11 font-semibold capitalize sm:text-5xl sm:leading-13 sm:tracking-wider rtl:sm:leading-16">
          {left_block.title}
        </h3>
        <p>{left_block.description}</p>
        <AppButton
          label={left_block.button_label}
          href={`/${locale}/${left_block.slug}`}
        />
      </div>
    </div>
  );
}
