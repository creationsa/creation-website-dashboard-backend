import Accordion from "@/components/ui/Accordion";
import Header from "@/components/ui/Header";
import { SolutionsCoreProps } from "../types";
import Video from "@/components/ui/Video";

export default function OurCapabilities({
  solutions,
  locale,
}: SolutionsCoreProps) {
  return (
    <section className="container flex flex-col items-center justify-between gap-10 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-[40%]">
        {/* CONTENT */}
        <Header
          title={solutions.why_choose_us}
          description={solutions.why_choose_us_description}
          subDescription={solutions.why_choose_us_sub_description}
          hasContainer={false}
          lang={locale}
          styles="w-full mb-10"
        />

        <Accordion content={solutions.capabilities} />
      </div>

      {/* VIDEO */}
      <Video
        src="https://creation.sa/videos/dna.mp4"
        poster="https://creation.sa/images/coverVideos/creation_dna_bg.jpg"
        containerClassName="relative aspect-4/3 w-full lg:w-[60%]"
        className="h-full object-cover"
      />
    </section>
  );
}
