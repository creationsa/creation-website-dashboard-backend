import Image from "next/image";
import { TrustedWebsiteProps } from "./types";

export default function TrustedWebsite({
  title,
  description,
  link,
  reviews,
  img,
}: TrustedWebsiteProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-2/6 sm:w-3/12">
        <Image src={img} alt={title} />
      </div>

      <h3 className="text-xl capitalize transition-all duration-300 sm:text-2xl">
        {title}
      </h3>
      <p className="w-full text-lg text-gray-600 sm:w-[60%] dark:text-gray-500">
        {description}
      </p>

      <a
        href={link}
        target="_blank"
        className="hover:text-tiffany-600 dark:hover:text-tiffany-100 transition-all duration-300"
      >
        {reviews.view_reviews}
      </a>
    </div>
  );
}
