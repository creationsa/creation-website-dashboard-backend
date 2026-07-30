import Header from "@/components/ui/Header";
import AboutBackground from "./AboutBackground";
import AboutStats from "./AboutStats";
import { AboutProps } from "./types";

export default function About({ locale, about }: AboutProps) {
  return (
    <section className="relative flex min-h-[80vh] flex-col gap-4 overflow-hidden md:min-h-screen">
      <Header
        title={about.header_title}
        description={about.header_description}
        subDescription={about.header_sub_description}
        inlineHeadings
        lang={locale}
      />
      <div className="relative flex-1 overflow-hidden">
        <AboutBackground />
        <div className="relative z-10 container h-full">
          <AboutStats about={about} locale={locale} />
        </div>
      </div>
    </section>
  );
}
