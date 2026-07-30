import Link from "next/link";
import { SolutionCardProps } from "../types";

export default function SolutionCard({
  locale,
  solution,
  translations,
}: SolutionCardProps) {
  const { icon: Icon, link, title, description } = solution;

  return (
    <li>
      <Link
        href={`/${locale}/solutions/${link}`}
        className="group flex flex-col gap-4"
        aria-label={title}
      >
        <div className="dark:group-hover:bg-white-100 group-hover:bg-black-800 dark:bg-black-400 bg-white-700 group-hover:text-white-100 dark:group-hover:text-black-100 w-fit rounded-full p-2 text-gray-600 transition-all duration-300 sm:p-4 dark:text-gray-500">
          <Icon className="size-7 sm:size-10" aria-hidden />
        </div>
        <h3 className="text-lg transition-all duration-300 group-hover:underline sm:text-2xl">
          {translations[title]}
        </h3>
        <p className="max-w-[90%] transition-all duration-300 group-hover:underline">
          {translations[description]}
        </p>
      </Link>
    </li>
  );
}
