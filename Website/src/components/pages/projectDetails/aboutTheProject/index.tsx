import Header from "@/components/ui/Header";
import SmartMedia from "@/components/ui/SmartMedia";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { AboutTheProjectProps } from "../types";

export default function AboutTheProject({
  locale,
  data,
  certainImage,
}: AboutTheProjectProps) {
  return (
    <section className="space-y-20">
      <div className="container space-y-8">
        <Header
          title={data.first_title}
          description={data.second_title}
          subDescription={data.third_title}
          hasContainer={false}
          lang={locale}
          inlineHeadings
          styles="w-full xl:w-[60%]"
        />

        <TextWithMotion
          text={data.overview_description}
          lang={locale}
          direction="start"
          styles="w-full md:w-[70%] xl:w-[60%]"
        />
      </div>

      {certainImage?.file && (
        <div className="relative aspect-4001/1392 w-full">
          <SmartMedia
            media={certainImage}
            alt={data.title}
            className="absolute inset-0 h-full w-full object-cover"
            quality={90}
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </div>
      )}
    </section>
  );
}
