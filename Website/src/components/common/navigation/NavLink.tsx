"use client";

import { RightArrowIcon } from "@/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { NavItemMedia, NavItemProps } from "./types";

function isNavItemMedia(
  image: NavItemProps["image"],
): image is NavItemMedia {
  return typeof image === "object" && image !== null && "file" in image;
}

export default function NavLink({
  href,
  label,
  title,
  image,
  isRTL,
  type,
}: NavItemProps) {
  const isPrev = type === "prev";
  const media = isNavItemMedia(image) ? image : null;
  const plainImage = media
    ? undefined
    : (image as string | StaticImageData | undefined);

  return (
    <Link
      href={href}
      className={`group flex w-[45%] flex-1 flex-col gap-2 text-base uppercase sm:text-2xl ${
        isPrev ? "text-start" : "sm:items-end"
      }`}
      aria-label={label}
    >
      <div
        className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 ${isPrev ? "justify-start" : "justify-end"}`}
      >
        {isPrev && (
          <span className="rotate-180 transition group-hover:-translate-x-1 rtl:scale-x-[-1] rtl:group-hover:translate-x-1">
            <RightArrowIcon className="size-6 sm:size-8" />
          </span>
        )}
        <span>{label}</span>
        {!isPrev && (
          <span className="transition group-hover:translate-x-1 rtl:scale-x-[-1] rtl:group-hover:-translate-x-1">
            <RightArrowIcon className="size-6 sm:size-8" />
          </span>
        )}
      </div>

      <span
        className={`hidden w-fit sm:block ${isPrev ? "me-auto" : "ms-auto"}`}
      >
        {title}
      </span>

      {(media?.file || plainImage) && (
        <motion.div
          initial={{
            opacity: 0,
            x: isPrev ? (isRTL ? 80 : -80) : isRTL ? -80 : 80,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-5 hidden aspect-square w-full sm:block"
        >
          {media?.type === "video" && media.file ? (
            <video
              src={media.file}
              poster={media.poster || undefined}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={media?.file || plainImage!}
              alt={title}
              fill
              sizes="(min-width: 1280px) 576px, 45vw"
              className="object-cover"
            />
          )}
        </motion.div>
      )}
    </Link>
  );
}
