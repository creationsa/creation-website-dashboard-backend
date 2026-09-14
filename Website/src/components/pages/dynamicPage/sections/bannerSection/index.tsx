"use client";

import { LanguageType } from "@/i18n.config";
import { motion } from "framer-motion";
import { BannerContent } from "../../types";
import { createImageReveal, textReveal } from "./animations";
import HeroMedia from "./HeroMedia";

interface BannerSectionProps {
  content: BannerContent;
  locale: LanguageType;
}

export default function BannerSection({ content, locale }: BannerSectionProps) {
  const isRTL = locale === "ar";
  const imageVariants = createImageReveal(isRTL);

  return (
    <section className="relative overflow-hidden">
      <HeroMedia
        media={content.left_media}
        alt={content.left_media.alt || content.first_title}
        variants={imageVariants}
        className="absolute -end-[10.8%] top-[27%] z-[-1] h-[150px] w-[250px] sm:top-[25%] sm:h-[100px] md:h-[200px] md:w-[400px] lg:h-[254px] lg:w-[550px] xl:h-[350px] xl:w-[700px] 2xl:h-[400px] 2xl:w-[900px]"
        sizes="(min-width: 1536px) 900px, (min-width: 1280px) 700px, (min-width: 1024px) 550px, (min-width: 768px) 400px, 250px"
      />

      <div className="container">
        <div className="relative">
          <HeroMedia
            media={content.right_media}
            alt={content.right_media.alt || content.second_title}
            variants={imageVariants}
            delay={0.4}
            className="absolute top-[20%] z-[-1] h-24 w-[130px] sm:h-20 sm:w-[70px] md:start-[79px] md:h-[190px] md:w-40 lg:h-[220px] lg:w-[185px] xl:h-[328px] xl:w-[275px]"
            sizes="(min-width: 1280px) 275px, (min-width: 1024px) 185px, (min-width: 768px) 160px, 130px"
          />

          <motion.h1
            variants={textReveal}
            initial="hidden"
            animate="show"
            className="font-head font-fancy mb-[55px] ps-[16.5%] pt-[33%] text-3xl uppercase sm:ps-[15%] sm:pt-[28%] sm:text-6xl lg:ps-[10%] lg:pt-[27%] lg:text-[80px] xl:ps-[15%] xl:pt-[30%] xl:text-8xl 2xl:pt-[22%] 2xl:text-[122px]"
          >
            {content.first_title} <br />
            <span className="text-gray-600 dark:text-gray-500">
              {content.second_title}
            </span>{" "}
            <span className="text-tiffany-500 dark:text-tiffany-100">
              {content.third_title}
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
