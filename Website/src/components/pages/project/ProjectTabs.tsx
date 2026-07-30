"use client";

import { motion } from "framer-motion";
import { ProjectTabsProps } from "./types";
import { PROJECT_TABS } from "./tabs";

export default function ProjectTabs({
  activeTab,
  onChange,
  labels,
}: ProjectTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {PROJECT_TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative px-2 text-xl font-semibold uppercase transition-colors duration-300 ${
              isActive
                ? "text-black-100 dark:text-white-100"
                : "text-gray-600 dark:text-gray-500"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeTab"
                className="bg-tiffany-600 dark:bg-tiffany-100 absolute -start-2 top-1/2 h-8 w-2 -translate-y-1/2"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {labels[tab.label]}
          </button>
        );
      })}
    </div>
  );
}
