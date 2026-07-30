"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImageItemProps } from "../types";
import { itemVariants } from "./animations";

export default function ImageItem({
  src,
  full = false,
  index = 0,
  title,
  translations,
}: ImageItemProps) {
  const formattedAlt = translations?.project_image
    ?.replace("{{title}}", title || "")
    ?.replace("{{index}}", (index + 1).toString());

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative ${full ? "aspect-3167/1393" : "aspect-square"}`}
    >
      <Image
        src={src}
        alt={formattedAlt}
        className="object-cover"
        quality={`${full ? 90 : 80}`}
      />
    </motion.div>
  );
}
