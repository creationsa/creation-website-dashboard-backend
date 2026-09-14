"use client";

import { TwoGridProps } from "../types";
import ImageItem from "./ImageItem";

export default function TwoGrid({
  images,
  startIndex = 0,
  title,
}: TwoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {images.map((img, index) => (
        <ImageItem
          key={index}
          src={img}
          index={startIndex + index}
          title={title}
        />
      ))}
    </div>
  );
}
