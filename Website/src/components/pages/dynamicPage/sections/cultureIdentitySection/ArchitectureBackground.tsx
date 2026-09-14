"use client";

import SmartMedia from "@/components/ui/SmartMedia";
import { motion, Variants } from "framer-motion";
import { ArchitectureBackgroundProps } from "./types";

export const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ArchitectureBackground({
  media,
  alt,
}: ArchitectureBackgroundProps) {
  return (
    <motion.div
      className="relative top-4 aspect-square w-full sm:absolute sm:inset-0 sm:top-0 sm:z-0 sm:aspect-auto sm:h-screen sm:w-auto"
      initial="hidden"
      whileInView="show"
      variants={imageVariants}
      viewport={{ once: false, amount: 0.3 }}
    >
      <SmartMedia
        media={media}
        alt={alt}
        containerClassName="absolute inset-0 h-full w-full"
        className="h-full w-full object-cover"
        quality={90}
        sizes="100vw"
      />

      <div className="dark:from-black-800 from-white-200 absolute inset-x-0 bottom-0 h-[10%] bg-linear-to-t from-5% to-transparent" />
    </motion.div>
  );
}
