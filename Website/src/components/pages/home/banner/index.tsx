"use client";

import { motion } from "framer-motion";
import firstBanner from "../../../../../public/images/home/creation-home-banner1.jpg";
import secondBanner from "../../../../../public/images/home/creation-home-banner2.jpg";
import AnimatedHeroImage from "./AnimatedHeroImage";
import { createImageReveal, textReveal } from "./animations";
import { BannerProps } from "./types";

export default function Banner({ banner, locale }: BannerProps) {
  const isRTL = locale === "ar";
  const imageVariants = createImageReveal(isRTL);

  return (
    <section className="relative overflow-hidden">
      {/* Background FIRST Image */}
      <AnimatedHeroImage
        src={firstBanner}
        alt={banner.first_Img_alt}
        variants={imageVariants}
        className="absolute -end-[10.8%] top-[27%] z-[-1] h-[150px] w-[250px] sm:top-[25%] sm:h-[100px] md:h-[200px] md:w-[400px] lg:h-[254px] lg:w-[550px] xl:h-[350px] xl:w-[700px] 2xl:h-[400px] 2xl:w-[900px]"
      />

      <div className="container">
        <div className="relative">
          {/* Background SECOND Image */}
          <AnimatedHeroImage
            src={secondBanner}
            alt={banner.second_Img_alt}
            variants={imageVariants}
            delay={0.4}
            className="absolute top-[20%] z-[-1] h-24 w-[130px] sm:h-20 sm:w-[70px] md:start-[79px] md:h-[190px] md:w-40 lg:h-[220px] lg:w-[185px] xl:h-[328px] xl:w-[275px]"
          />

          {/* Hero Text */}
          <motion.h1
            variants={textReveal}
            initial="hidden"
            animate="show"
            className="font-head font-fancy mb-[55px] ps-[16.5%] pt-[33%] text-3xl uppercase sm:ps-[15%] sm:pt-[28%] sm:text-6xl lg:ps-[10%] lg:pt-[27%] lg:text-[80px] xl:ps-[15%] xl:pt-[30%] xl:text-8xl 2xl:pt-[22%] 2xl:text-[122px]"
          >
            {banner.first_text_title} <br />
            <span className="text-gray-600 dark:text-gray-500">
              {banner.second_text_title}
            </span>{" "}
            <span className="text-tiffany-500 dark:text-tiffany-100">
              {banner.third_text_title}
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
