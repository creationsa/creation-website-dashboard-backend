import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import AllTrustedWebsites from "./AllTrustedWebsites";
import { ReviewsSectionProps } from "./types";

export default function ReviewsSection({
  content,
  locale,
}: ReviewsSectionProps) {
  return (
    <section className="container">
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        hasContainer={false}
        inlineHeadings
        lang={locale}
        styles="mb-8!"
      />

      <TextWithMotion
        text={content.description}
        direction="start"
        styles="sm:w-[60%]! md:w-[50%]!"
      />

      <AllTrustedWebsites items={content.items} />
    </section>
  );
}
