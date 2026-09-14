import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { MainSectionProps } from "../types";

export default function MainSection({ locale, data }: MainSectionProps) {
  return (
    <section className="container">
      <Header
        title={data.title}
        description={data.second_title}
        subDescription={data.third_title}
        hasContainer={false}
        lang={locale}
        styles="w-full xl:w-[50%]"
      />

      <div className="ms-auto mt-20 w-full xl:w-1/2">
        <h3 className="mb-8 text-xl capitalize sm:text-2xl">
          {data.proposition_title}
        </h3>
        <TextWithMotion
          text={data.proposition_desc}
          lang={locale}
          direction="start"
          styles="md:w-full!"
        />
      </div>
    </section>
  );
}
