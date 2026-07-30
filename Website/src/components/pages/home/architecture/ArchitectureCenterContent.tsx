"use client";

import { motion, Variants } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { ArchitectureCenterContentProps } from "./types";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ArchitectureCenterContent({
  headline,
  description,
  locale,
}: ArchitectureCenterContentProps) {
  return (
    <motion.div
      className="absolute top-[75%] left-1/2 z-10 container flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center sm:px-8 lg:w-5xl lg:gap-8 xl:w-7xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      <motion.h1
        variants={itemVariants}
        className="font-head font-fancy text-2xl font-semibold tracking-wide sm:text-4xl lg:text-5xl xl:text-7xl"
      >
        {headline}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-black-100 dark:text-white-100 max-w-lg xl:max-w-2xl 2xl:max-w-4xl"
      >
        {description}
      </motion.p>

      <motion.div variants={itemVariants}>
        <Logo locale={locale} />
      </motion.div>
    </motion.div>
  );
}
