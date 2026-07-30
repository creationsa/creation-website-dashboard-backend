import Image from "next/image";
import Link from "next/link";
import { ProjectCardProps } from "./types";

export default function ProjectCard({
  slug,
  locale,
  firstImage,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/projects/${slug}`}
      className="group flex min-w-[70vw] snap-center flex-col gap-2 sm:min-w-0"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={firstImage}
          alt={title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
        />
      </div>
      <h3 className="min-h-[60px] text-xl uppercase transition-all duration-700 group-hover:underline sm:text-2xl">
        {title}
      </h3>
      <p>{description}</p>
    </Link>
  );
}
