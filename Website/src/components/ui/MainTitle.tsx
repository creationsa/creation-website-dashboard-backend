"use client";

import { motion, Variants } from "framer-motion";

interface MainTitleProps {
  title: string;
  withAnimation?: boolean;
  variants?: Variants;
  className?: string;
}

export default function MainTitle({
  title,
  withAnimation = false,
  variants,
  className = "",
}: MainTitleProps) {
  const Content = (
    <div className={`mb-3 flex items-center gap-1.5 ${className}`}>
      <span className="bg-tiffany-600 dark:bg-tiffany-100 size-2.5 rounded-full" />
      <span className="text-sm font-medium uppercase">{title}</span>
    </div>
  );

  if (withAnimation && variants) {
    return <motion.div variants={variants}>{Content}</motion.div>;
  }

  return Content;
}
