"use client";

import { BaseSlider } from "@/components/ui/BaseSlider";
import TeamSlideItem from "./TeamSlideItem";
import { TEAM_MEMBERS } from "./teamData";

export default function TeamSlider() {
  return (
    <BaseSlider
      items={TEAM_MEMBERS}
      renderItem={(team) => <TeamSlideItem {...team} />}
      config={{
        loop: true,
        spaceBetween: 20,
        speed: 4000,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2.5,
          },
          1280: {
            slidesPerView: 3.5,
          },
        },
      }}
    />
  );
}
