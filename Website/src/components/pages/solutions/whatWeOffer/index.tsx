import FullWidthSlider from "@/components/common/fullWidthItems/FullWidthSlider";
import Header from "@/components/ui/Header";
import { WhatWeOfferProps } from "../types";

export default function WhatWeOffer({ mainData, locale }: WhatWeOfferProps) {
  if (mainData.items.length === 0) return null;

  return (
    <section>
      {/* HEADER */}
      <Header
        title={mainData.items_header.first_title}
        description={mainData.items_header.second_title}
        subDescription={mainData.items_header.third_title}
        lang={locale}
        styles="w-full mb-20"
      />

      <FullWidthSlider locale={locale} items={mainData.items} />
    </section>
  );
}
