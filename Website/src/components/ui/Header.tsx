"use client";

import { motion, Variants } from "framer-motion";
import MainTitle from "./MainTitle";

interface HeaderProps {
  title?: string;
  description: string;
  subDescription?: string;
  hasContainer?: boolean;
  styles?: string;
  inlineHeadings?: boolean;
  lang?: "en" | "ar";
}

export default function Header({
  title,
  description,
  subDescription,
  hasContainer = true,
  styles = "",
  inlineHeadings = false,
  lang = "ar",
}: HeaderProps) {
  const xDirection = lang === "ar" ? 50 : -50;

  const container: Variants = {
    hidden: { opacity: 0, x: xDirection },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: xDirection / 1.5 },
    show: { opacity: 1, x: 0 },
  };

  const renderSubDescription = () => {
    if (!subDescription) return null;

    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    const match = subDescription.match(emailRegex);

    if (!match) return subDescription;

    const email = match[0];

    const parts = subDescription.split(email);

    return (
      <>
        {parts[0]}
        <a
          href={`mailto:${email}`}
          className="hover:text-tiffany-600 hover:dark:text-tiffany-100 normal-case underline transition-colors duration-300"
        >
          {email}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`font-medium capitalize ${hasContainer ? "container" : ""} ${styles}`}
    >
      {title && <MainTitle title={title} withAnimation variants={item} />}

      <motion.h2 variants={item} className="font-head font-fancy">
        <span className={inlineHeadings ? "inline" : "block"}>
          {description}
        </span>

        {subDescription && (
          <span
            className={`text-gray-600 dark:text-gray-500 ${
              inlineHeadings ? "inline" : "block"
            }`}
          >
            {inlineHeadings && " "}
            {renderSubDescription()}
          </span>
        )}
      </motion.h2>
    </motion.div>
  );
}
