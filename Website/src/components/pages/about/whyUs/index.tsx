import Header from "@/components/ui/Header";
import { BaseAboutProps } from "../types";
import Video from "@/components/ui/Video";

export default function WhyUs({ about, locale }: BaseAboutProps) {
  return (
    <section className="container flex flex-col items-center justify-between gap-10 lg:flex-row">
      {/* VIDEO */}
      <Video
        src="https://creation.sa/videos/dna.mp4"
        poster="https://creation.sa/images/coverVideos/creation_dna_bg.jpg"
        containerClassName="relative aspect-4/3 w-full"
        className="h-full object-cover"
      />

      {/* CONTENT */}
      <div>
        <Header
          title={about.why_us}
          description={about.why_us_description}
          subDescription={about.why_us_sub_description}
          hasContainer={false}
          lang={locale}
        />
        <p className="ms:mt-8 mt-4 w-full sm:max-w-[80%]">
          {about.why_us_words}
        </p>
      </div>
    </section>
  );
}
