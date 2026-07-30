"use client";

import { motion } from "framer-motion";
import { FooterTitleProps } from "./types";

export default function FooterTitle({ title }: FooterTitleProps) {
  return (
    <h1 className="relative w-1/2 font-semibold tracking-wider uppercase sm:w-2/3 lg:text-xl">
      {/* Line background */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="bg-border-800 dark:bg-border-900 absolute start-0 -bottom-2.5 h-1 w-full ltr:origin-left rtl:origin-right"
      />

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          ease: "easeOut",
        }}
        className="bg-tiffany-600 dark:bg-tiffany-100 absolute start-0 -bottom-3 h-2 w-1/3 ltr:origin-left rtl:origin-right"
      />

      {title}
    </h1>
  );
}
