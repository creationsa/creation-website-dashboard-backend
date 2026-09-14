import { RightArrowIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "./types";

export default function BlogCard({
  blog,
  blogsTranslation,
  bigBottomPadding,
  locale,
}: BlogCardProps) {
  const { slug, title, created_at, base_image } = blog;

  return (
    <Link
      href={`/${locale}/blogs/${slug}`}
      className={`group flex gap-2 not-last:border-b sm:gap-8 ${bigBottomPadding ? "not-last:pb-16" : "not-last:pb-4"}`}
    >
      {/* Image */}
      <div className="relative aspect-square h-full w-1/3 overflow-hidden sm:w-[20%]">
        <Image
          src={base_image?.media}
          alt={`${base_image?.[locale]?.alt}`}
          fill
          sizes="(min-width: 1280px) 256px, (min-width: 640px) 20vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <h3 className="text-xl capitalize transition-all duration-500 group-hover:underline sm:max-w-[80%] sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm uppercase">
          {blogsTranslation.applied} {created_at}
        </p>
      </div>

      {/* Arrow Icon */}
      <span className="ms-auto hidden transition group-hover:translate-x-1 sm:block rtl:scale-x-[-1] rtl:group-hover:-translate-x-1">
        <RightArrowIcon />
      </span>
    </Link>
  );
}
