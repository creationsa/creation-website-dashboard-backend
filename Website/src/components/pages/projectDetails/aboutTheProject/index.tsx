import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import Image from "next/image";
import { AboutTheProjectProps } from "../types";

export default function AboutTheProject({
  locale,
  project,
  title,
  certainImage,
}: AboutTheProjectProps) {
  return (
    <section className="space-y-20">
      <div className="container space-y-8">
        <Header
          title={title}
          description={project.about_project_description}
          subDescription={project.about_project_sub_description}
          hasContainer={false}
          lang={locale}
          inlineHeadings
          styles="w-full xl:w-[60%]"
        />

        <TextWithMotion
          text={project.about_project_paragraph}
          lang={locale}
          direction="start"
          styles="w-full md:w-[70%] xl:w-[60%]"
        />
      </div>

      <div className="relative aspect-4001/1392 w-full">
        <Image
          src={certainImage}
          alt={title}
          fill
          className="object-cover"
          quality={90}
        />
      </div>
    </section>
  );
}

//16/6
