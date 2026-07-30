import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { ReviewsProps } from "./types";
import AllTrustedWebsites from "./AllTrustedWebsites";

export default function Reviews({ reviews, locale }: ReviewsProps) {
  return (
    <section className="container">
      <Header
        title={reviews.header_title}
        description={reviews.header_description}
        subDescription={reviews.header_sub_description}
        hasContainer={false}
        inlineHeadings
        lang={locale}
        styles="mb-8!"
      />

      <TextWithMotion
        text={reviews.header_brief}
        direction="start"
        styles="sm:w-[60%]! md:w-[50%]!"
      />

      <AllTrustedWebsites reviews={reviews} />
    </section>
  );
}
