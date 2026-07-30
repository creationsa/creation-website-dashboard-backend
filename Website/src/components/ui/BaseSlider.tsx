"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";

interface BaseSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  config?: SwiperProps;
}

export function BaseSlider<T>({
  items,
  renderItem,
  config,
}: BaseSliderProps<T>) {
  const [isReady, setIsReady] = useState(false);

  return (
    <Swiper
      {...config}
      slidesPerView={config?.slidesPerView || 1}
      onInit={() => setIsReady(true)}
      className={`w-full ${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      {items.map((item, i) => (
        <SwiperSlide key={i}>{renderItem(item, i)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
