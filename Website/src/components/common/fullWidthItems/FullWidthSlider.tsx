"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay } from "swiper/modules";
import ItemSlideItem from "./FullWidthSliderItem";
import { FullWidthSliderProps } from "./types";

export default function FullWidthSlider({
  locale,
  items,
}: FullWidthSliderProps) {
  return (
    <div>
      <BaseSlider
        items={items}
        renderItem={(item) => <ItemSlideItem item={item} locale={locale} />}
        config={{
          modules: [Autoplay],
          loop: true,
          autoplay: {
            delay: 400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          speed: 4000,
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
            2560: {
              slidesPerView: 5,
            },
          },
        }}
      />
    </div>
  );
}
