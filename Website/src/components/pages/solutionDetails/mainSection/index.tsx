import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { MainSectionProps } from "../types";

export default function MainSection({
  locale,
  solutionData,
  solution_details,
}: MainSectionProps) {
  return (
    <section className="container">
      <Header
        title={solutionData.title}
        description={solutionData.section1_description}
        subDescription={solutionData.section1_sub_desc}
        hasContainer={false}
        lang={locale}
        styles="w-full xl:w-[50%]"
      />

      <div className="ms-auto mt-20 w-full xl:w-1/2">
        <h3 className="mb-8 text-xl capitalize sm:text-2xl">
          {solution_details.value_proposition}
        </h3>
        <TextWithMotion
          text={solutionData.section1_paragraph}
          lang={locale}
          direction="start"
          styles="md:w-full!"
        />
      </div>
    </section>
  );
}
