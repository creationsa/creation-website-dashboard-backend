import Link from "next/link";
import SmartMedia from "@/components/ui/SmartMedia";
import { ProjectCardProps } from "./types";

export default function ProjectCard({
  project_details,
  locale,
  description,
}: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/${project_details.slug}`}
      className="group flex min-w-[70vw] snap-center flex-col gap-2 sm:min-w-0"
    >
      <div className="relative aspect-square overflow-hidden">
        <SmartMedia
          media={project_details.image}
          alt={project_details.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 70vw"
        />
      </div>
      <h3 className="min-h-[60px] text-xl uppercase transition-all duration-700 group-hover:underline sm:text-2xl">
        {project_details.title}
      </h3>
      <p>{description}</p>
    </Link>
  );
}
