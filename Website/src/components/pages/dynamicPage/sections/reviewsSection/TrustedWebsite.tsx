import Image from "next/image";
import { ReviewItem } from "./types";

export default function TrustedWebsite({
  title,
  description,
  logo_image,
  link_text,
  link_url,
}: ReviewItem) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-2/6 sm:w-3/12">
        <Image
          src={logo_image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <h3 className="text-xl capitalize transition-all duration-300 sm:text-2xl">
        {title}
      </h3>
      <p className="w-full text-lg text-gray-600 sm:w-[60%] dark:text-gray-500">
        {description}
      </p>

      <a
        href={link_url}
        target="_blank"
        className="hover:text-tiffany-600 dark:hover:text-tiffany-100 transition-all duration-300"
      >
        {link_text}
      </a>
    </div>
  );
}
