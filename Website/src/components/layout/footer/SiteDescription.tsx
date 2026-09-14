import Logo from "@/components/ui/Logo";
import { SiteDescriptionProps } from "./types";

export default function SiteDescription({
  locale,
  data,
}: SiteDescriptionProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Logo locale={locale} logoUrl={data?.logo} logoAlt={data?.logo_alt} />

      <p className="w-full text-xs sm:text-base sm:leading-7! md:w-[80%] md:text-base lg:text-base xl:text-base 2xl:text-base">
        {data?.description}
      </p>

      <span className="text-xs font-bold sm:text-base">{data?.tagline}</span>
    </div>
  );
}
