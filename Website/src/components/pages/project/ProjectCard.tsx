"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SmartMedia from "@/components/ui/SmartMedia";
import { ProjectCardProps } from "./types";
import { useCursorTooltip } from "./useCursorTooltip";

const directions = [
  { x: -120, y: 0 },
  { x: 120, y: 0 },
  { x: 0, y: -120 },
  { x: 0, y: 120 },
];

const MotionLink = motion(Link);

export default function ProjectCard({ item, directionIndex }: ProjectCardProps) {
  const randomDirection = directions[directionIndex % directions.length];

  const pathname = usePathname();
  const fullHref = `${pathname}/${item.slug.replace(/^\/?/, "")}`;

  const [showTooltip, setShowTooltip] = useState(false);

  // cursor position
  const { x, y, updatePosition } = useCursorTooltip();

  return (
    <MotionLink
      href={fullHref}
      passHref
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.85,
          filter: "blur(10px)",
          ...randomDirection,
        },
        show: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      onMouseMove={updatePosition}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`group relative aspect-square w-full cursor-pointer ${showTooltip ? "z-50" : "z-0"}`}
    >
      {/* IMAGE */}
      <SmartMedia
        media={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 sm:grayscale sm:group-hover:grayscale-0"
        sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
      />

      {/* TOOLTIP */}
      {showTooltip && (
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="dark:text-black-100 text-white-100 pointer-events-none absolute top-0 left-0 z-1000 flex flex-col font-semibold uppercase"
        >
          <span className="bg-tiffany-600 dark:bg-tiffany-100 px-6 py-3 text-xl">
            {item.title}
          </span>
        </motion.div>
      )}
    </MotionLink>
  );
}
