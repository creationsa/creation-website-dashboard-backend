import SmartMedia from "@/components/ui/SmartMedia";
import { AboutBackgroundProps } from "./types";

export default function AboutBackground({ media, alt }: AboutBackgroundProps) {
  return (
    <SmartMedia
      media={media}
      alt={alt}
      containerClassName="absolute inset-0 h-full w-full"
      className="h-full w-full object-cover"
      sizes="100vw"
    />
  );
}
