"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay, FreeMode } from "swiper/modules";
import NetworkSlideItem from "./NetworkSlideItem";
import { NETWORKS } from "./networks";

export default function NetworkSlider() {
  return (
    <BaseSlider
      items={NETWORKS}
      renderItem={(network) => <NetworkSlideItem {...network} />}
      config={{
        modules: [Autoplay],
        loop: true,
        spaceBetween: 4,
        loopAdditionalSlides: NETWORKS.length * 2,
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
