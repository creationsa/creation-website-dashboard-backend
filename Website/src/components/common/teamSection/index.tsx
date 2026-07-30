import Header from "@/components/ui/Header";
import TeamSlider from "./TeamSlider";
import { TeamSectionProps } from "./types";

export default function TeamSection({
  title,
  description,
  subDescription,
  locale,
}: TeamSectionProps) {
  return (
    <section className="space-y-20">
      <Header
        title={title}
        description={description}
        subDescription={subDescription}
        lang={locale}
      />
      <TeamSlider />
    </section>
  );
}
