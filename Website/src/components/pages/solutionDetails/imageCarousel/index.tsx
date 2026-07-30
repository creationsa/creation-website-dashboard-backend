"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Pagination, Autoplay } from "swiper/modules";
import { ImageSliderProps } from "../types";
import ImageSlideItem from "./ImageSlideItem";

export default function ImageCarousel({
  images,
  solutionTitle,
}: ImageSliderProps) {
  return (
    <section>
      <BaseSlider
        items={images}
        renderItem={(src, index) => (
          <ImageSlideItem
            src={src}
            solutionTitle={solutionTitle}
            index={index}
          />
        )}
        config={{
          modules: [Autoplay, Pagination],
          loop: true,
          autoplay: {
            delay: 400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          spaceBetween: 20,
          speed: 4000,
          pagination: {
            el: ".custom-pagination",
            clickable: true,
          },
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
            1280: {
              slidesPerView: 4,
            },
          },
        }}
      />

      <div className="custom-pagination" />
    </section>
  );
}
