"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedHeroImageProps } from "./types";

export default function AnimatedHeroImage({
  src,
  alt,
  className,
  variants,
  delay,
}: AnimatedHeroImageProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      transition={delay ? { delay } : undefined}
      className={className}
    >
      <Image src={src} alt={alt} fill priority className="object-cover" />
    </motion.div>
  );
}
