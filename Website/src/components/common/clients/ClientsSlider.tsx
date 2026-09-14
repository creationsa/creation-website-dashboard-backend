"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay } from "swiper/modules";
import ClientLogoItem from "./ClientLogoItem";
import { ClientsSliderProps } from "./types";

export default function ClientsSlider({ logos }: ClientsSliderProps) {
  return (
    <BaseSlider
      items={logos}
      renderItem={(logo) => <ClientLogoItem logo={logo} />}
      config={{
        modules: [Autoplay],
        loop: true,
        spaceBetween: 4,
        loopAdditionalSlides: logos.length * 2,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        allowTouchMove: false,
        speed: 1500,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
        },
      }}
    />
  );
}
