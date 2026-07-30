import Logo from "../../ui/Logo";
import { SiteDescriptionProps } from "./types";

export default function SiteDescription({
  footer,
  locale,
}: SiteDescriptionProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Logo locale={locale} />

      <p className="w-full text-xs sm:text-base sm:leading-7! md:w-[80%] md:text-base lg:text-base xl:text-base 2xl:text-base">
        {footer.description}
      </p>

      <span className="text-xs font-bold sm:text-base">
        {footer.description_brief}
      </span>
    </div>
  );
}
