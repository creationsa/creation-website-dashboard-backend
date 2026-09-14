"use client";

import { motion } from "framer-motion";
import SmartMedia from "@/components/ui/SmartMedia";
import { ImageItemProps } from "../types";
import { itemVariants } from "./animations";

export default function ImageItem({
  src,
  full = false,
  index = 0,
  title,
}: ImageItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative ${full ? "aspect-3167/1393" : "aspect-square"}`}
    >
      <SmartMedia
        media={src}
        alt={src.alt || title}
        className="absolute inset-0 h-full w-full object-cover"
        quality={full ? 90 : 80}
        sizes={
          full
            ? "(min-width: 1280px) 1280px, 100vw"
            : "(min-width: 768px) 640px, 100vw"
        }
      />
    </motion.div>
  );
}
