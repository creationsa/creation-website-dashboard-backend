import Link from "next/link";
import SmartMedia from "@/components/ui/SmartMedia";
import { ContainedSliderItemProps } from "../types";

export default function ContainedSliderItem({
  item,
  locale,
}: ContainedSliderItemProps) {
  return (
    <Link
      href={`/${locale}/${item.slug}`}
      aria-label={item.title}
      className="group flex w-full flex-col gap-6"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <SmartMedia
          media={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 sm:grayscale sm:group-hover:scale-110 sm:group-hover:grayscale-0"
          sizes="(min-width: 640px) 625px, 100vw"
        />
      </div>

      <div className="text-center">
        <h3 className="group-hover:text-tiffany-600! dark:group-hover:text-tiffany-100! text-xl uppercase transition-all duration-500 sm:text-2xl">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}
