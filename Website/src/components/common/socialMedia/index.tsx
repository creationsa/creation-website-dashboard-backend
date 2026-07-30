import { SOCIAL_LINKS } from "./socialLinksData";
import { SocialMediaProps } from "./types";

export default function SocialMedia({ translations }: SocialMediaProps) {
  return (
    <ul className="flex min-h-[25px] flex-wrap gap-2 sm:min-h-0 sm:gap-3">
      {SOCIAL_LINKS.map(({ href, title }) => {
        return (
          <li key={title}>
            <a
              href={href}
              target="_blank"
              className="hover:text-tiffany-600 dark:hover:text-tiffany-100 text-xs capitalize transition-all duration-500 hover:-translate-y-1 sm:text-base"
              aria-label={translations[title]}
            >
              <div className="group hover:text-tiffany-600 dark:hover:text-tiffany-100 text-gray-600 transition-all duration-200 dark:text-gray-500">
                <span className="relative">
                  {translations[title]}

                  {/* subtle underline animation */}
                  <span className="absolute start-0 bottom-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
