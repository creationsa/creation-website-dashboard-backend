import HeroImage from "@/components/common/heroImage";
import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { BaseAboutProps } from "../types";
import { STATS } from "./statsData";
import StatsSection from "./StatsSection";

export default function MainSection({ locale, about }: BaseAboutProps) {
  const stats = STATS.map((stat) => ({
    value: about[stat.value],
    label: about[stat.label],
  }));

  return (
    <section className="container flex flex-col gap-[55px]">
      <Header
        title={about.header_title_page}
        description={about.header_description_page}
        subDescription={about.header_sub_description_page}
        hasContainer={false}
        lang={locale}
      />

      <TextWithMotion text={about.vision} lang={locale} />

      <HeroImage
        yearsValue={about.years_stats}
        yearsLabel={about.years_experience}
      />

      <TextWithMotion text={about.mission} lang={locale} direction="start" />

      <StatsSection stats={stats} />
    </section>
  );
}
