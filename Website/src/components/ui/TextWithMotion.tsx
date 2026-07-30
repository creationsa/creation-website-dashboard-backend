"use client";

import { motion, Variants } from "framer-motion";

interface TextWithMotionProps {
  text: string;
  lang?: "en" | "ar";
  direction?: "start" | "end";
  styles?: string;
}

export default function TextWithMotion({
  text,
  lang = "en",
  direction = "end",
  styles = "",
}: TextWithMotionProps) {
  const xStart = lang === "ar" ? 50 : -50;
  const xEnd = 0;

  const variants: Variants = {
    hidden: { opacity: 0, x: xStart },
    show: { opacity: 1, x: xEnd, transition: { duration: 0.5 } },
  };
  return (
    <motion.p
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`text-lg text-gray-600 md:w-[40%] dark:text-gray-500 ${direction === "start" ? "md:me-auto" : "md:ms-[calc(50%+40px)]"} ${styles}`}
    >
      {text}
    </motion.p>
  );
}
