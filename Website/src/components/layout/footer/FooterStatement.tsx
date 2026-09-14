import DynamicSvg from "../../ui/DynamicSvg";
import { FooterStatementProps } from "./types";

export default function FooterStatement({ data }: FooterStatementProps) {
  if (!data?.statement_image) return null;

  return (
    <div className="border-y py-10 lg:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <DynamicSvg
          src={data.statement_image}
          title={data.statement_image_alt}
          className="svg-logo-wrapper svg-logo h-auto w-[15%] md:w-[10%] xl:w-[8%]"
        />
        <p className="flex-1 text-xs sm:text-base sm:leading-7! md:w-[80%] md:text-base lg:max-w-[65%] lg:text-base xl:text-base 2xl:text-base">
          {data.statement_desc}
        </p>
      </div>
    </div>
  );
}
