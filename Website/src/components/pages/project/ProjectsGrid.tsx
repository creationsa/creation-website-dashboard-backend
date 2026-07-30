"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ProjectsGridProps } from "./types";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function ProjectsGrid({ projects, project }: ProjectsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="relative my-25 grid grid-cols-1 gap-10 md:grid-cols-2"
    >
      <AnimatePresence mode="wait">
        {projects.map((item, index) => (
          <ProjectCard
            key={index}
            item={item}
            project={project}
            directionIndex={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
