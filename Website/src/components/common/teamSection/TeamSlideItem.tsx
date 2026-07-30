import Image from "next/image";
import { SlideData } from "./types";

export default function TeamSlideItem({
  image,
  title,
  description,
}: SlideData) {
  return (
    <div className="group relative aspect-4/5 w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover grayscale duration-500 group-hover:grayscale-0"
      />

      <div className="dark:from-black-800 from-white-100 dark:group-hover:from-tiffany-900 group-hover:from-tiffany-300 absolute inset-0 translate-y-0 bg-linear-to-t to-transparent to-40% duration-500 group-hover:to-transparent group-hover:to-45%" />

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center uppercase duration-500 group-hover:-translate-y-6">
        <span className="group-hover:text-white-100 dark:group-hover:text-black-900 w-[90%] text-lg font-bold group-hover:font-normal sm:text-xl">
          {title}
        </span>
        <span className="group-hover:text-white-100 dark:group-hover:text-black-900 block font-semibold text-gray-600 group-hover:font-normal dark:text-gray-500">
          {description}
        </span>
      </div>
    </div>
  );
}
