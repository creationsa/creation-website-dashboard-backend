import ActionLink from "@/components/ui/ActionLink";
import { CTABoxProps } from "./types";

export default function CTABox({
  title,
  description,
  actionLabel,
  actionHref,
  external = false,
}: CTABoxProps) {
  return (
    <section className="relative container">
      <div className="dark:bg-black-400/25 bg-white-700/25 flex flex-col items-center gap-8 px-5 py-10 shadow-md sm:px-10 sm:py-15 md:p-20 lg:min-h-[400px] lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex w-full flex-col gap-5 lg:w-1/2">
          <h2 className="font-semibold uppercase">{title}</h2>

          <p>{description}</p>
        </div>

        <ActionLink
          content={actionLabel}
          href={actionHref}
          external={external}
        />
      </div>

      {/* Green Glow */}
      <div className="bg-tiffany-600/60 dark:bg-tiffany-100/25 pointer-events-none absolute end-0 top-1/2 -z-2 h-[140%] w-full -translate-y-1/2 rounded-full blur-[120px] md:w-1/2" />
    </section>
  );
}
