import Header from "@/components/ui/Header";
import { WhatWeOfferProps } from "../types";
import ProjectSlider from "./ProjectSlider";

export default function WhatWeOffer({
  solutions,
  project_details,
  locale,
}: WhatWeOfferProps) {
  return (
    <section>
      {/* HEADER */}
      <Header
        title={solutions.what_we_offer}
        description={solutions.what_we_offer_description}
        subDescription={solutions.what_we_offer_sub_description}
        lang={locale}
        styles="w-full mb-20"
      />

      <ProjectSlider locale={locale} project_details={project_details} />
    </section>
  );
}
