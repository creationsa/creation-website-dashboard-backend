"use client";

import SmartMedia from "@/components/ui/SmartMedia";
import { motion } from "framer-motion";
import { HeroMediaProps } from "./types";

export default function HeroMedia({
  media,
  alt,
  className,
  variants,
  delay,
  sizes,
}: HeroMediaProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      transition={delay ? { delay } : undefined}
      className={className}
    >
      <SmartMedia
        media={media}
        alt={alt}
        containerClassName="absolute inset-0 h-full w-full"
        className="h-full w-full object-cover"
        priority
        sizes={sizes}
      />
    </motion.div>
  );
}
