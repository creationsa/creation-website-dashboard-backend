import Image from "next/image";
import Link from "next/link";
import { ProjectSlideItemProps } from "./types";

export default function ProjectSlideItem({
  image,
  transitionKey,
  href,
  project_details,
  locale,
}: ProjectSlideItemProps) {
  const projectData = project_details[transitionKey];

  return (
    <Link
      href={`/${locale}/projects/${href}`}
      aria-label={projectData.title}
      className="group flex w-full flex-col gap-6"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={projectData.title}
          fill
          className="object-cover transition-all duration-500 sm:grayscale sm:group-hover:scale-110 sm:group-hover:grayscale-0"
        />
      </div>

      <div className="text-center">
        <h3 className="group-hover:text-tiffany-600! dark:group-hover:text-tiffany-100! text-xl uppercase transition-all duration-500 sm:text-2xl">
          {projectData.title}
        </h3>
      </div>
    </Link>
  );
}
