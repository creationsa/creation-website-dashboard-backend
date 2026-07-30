"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import { Autoplay } from "swiper/modules";
import ProjectSlideItem from "./ProjectSlideItem";
import { PROJECTS } from "./projectsData";
import { ProjectSliderProps } from "../types";

export default function ProjectSlider({
  locale,
  project_details,
}: ProjectSliderProps) {
  return (
    <div>
      <BaseSlider
        items={PROJECTS}
        renderItem={(project) => (
          <ProjectSlideItem
            {...project}
            locale={locale}
            project_details={project_details}
          />
        )}
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
