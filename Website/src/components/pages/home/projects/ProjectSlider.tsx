"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay } from "swiper/modules";
import ProjectSlideItem from "./ProjectSlideItem";
import { PROJECTS } from "./projects";
import { ProjectSliderProps } from "./types";

export default function ProjectSlider({
  project_details,
  locale,
}: ProjectSliderProps) {
  return (
    <BaseSlider
      items={PROJECTS}
      renderItem={(project) => (
        <ProjectSlideItem
          {...project}
          project_details={project_details}
          locale={locale}
        />
      )}
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
