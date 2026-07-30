import Image from "next/image";
import Link from "next/link";
import { ProjectSlideItemProps } from "../types";

export default function ImageSlideItem({
  image,
  translationKey,
  href,
  project_details,
  locale,
}: ProjectSlideItemProps) {
  const certainProject = project_details[translationKey];

  return (
    <div className="group w-full">
      {/* IMAGE + OVERLAY WRAPPER */}
      <div className="relative isolation-auto aspect-square w-full lg:overflow-hidden">
        {/* IMAGE */}
        <Image
          src={image}
          alt={certainProject.title}
          fill
          className="scale-[1.01] object-cover transition-all duration-500 lg:grayscale lg:group-hover:scale-110 lg:group-hover:grayscale-0"
        />

        {/* OVERLAY */}
        <div className="dark:from-black-800 from-white-100 lg:dark:group-hover:from-tiffany-900 lg:group-hover:from-tiffany-300 absolute -inset-x-1 top-0 -bottom-1 z-10 bg-linear-to-t to-transparent to-40% duration-500 lg:group-hover:to-transparent lg:group-hover:to-45%" />

        {/* Content — lg+ only (hover behavior) */}
        <div className="font-head font-fancy absolute -bottom-44 left-1/2 z-20 hidden w-[65%] -translate-x-1/2 text-center opacity-0 transition-all duration-500 ease-in-out lg:block lg:group-hover:bottom-10 lg:group-hover:opacity-100">
          <Link
            href={`/${locale}/projects/${href}`}
            aria-label={certainProject.title}
            className="text-xl font-bold uppercase"
          >
            {certainProject.title}
          </Link>
        </div>
      </div>

      {/* Content — mobile only (below image, always visible) */}
      <div className="font-head font-fancy mt-4 text-center lg:hidden">
        <Link
          href={`/${locale}/projects/${href}`}
          aria-label={certainProject.title}
          className="w-[65%] text-lg font-bold uppercase"
        >
          {certainProject.title}
        </Link>
      </div>
    </div>
  );
}
