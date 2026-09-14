import Header from "@/components/ui/Header";
import { AllSolutionsProps } from "../types";
import News from "@/components/common/news";

export default function AllSolutions({ mainData, locale }: AllSolutionsProps) {
  return (
    <section className="container">
      {/* HEADER */}
      <Header
        description={mainData.core_desc}
        subDescription={mainData.core_sub_desc}
        lang={locale}
        hasContainer={false}
        inlineHeadings
        styles="w-full mb-20 xl:w-[80%]"
      />

      {/* NEWS */}
      <News data={mainData.ticker_items} hasBorder />
    </section>
  );
}
