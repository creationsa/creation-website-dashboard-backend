"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay } from "swiper/modules";
import { ContainedSliderProps } from "../types";
import ProjectSlideItem from "./ContainedSliderItem";

export default function ContainedSlider({
  projects,
  locale,
}: ContainedSliderProps) {
  return (
    <BaseSlider
      items={projects}
      renderItem={(item) => <ProjectSlideItem item={item} locale={locale} />}
      config={{
        modules: [Autoplay],
        loop: true,
        spaceBetween: 30,
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
        },
      }}
    />
  );
}
