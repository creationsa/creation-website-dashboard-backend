import Accordion from "@/components/ui/Accordion";
import Header from "@/components/ui/Header";
import ActionLink from "@/components/ui/ActionLink";
import { QuestionsProps } from "./types";

export default function Questions({
  locale,
  faq,
  showCTA = true,
}: QuestionsProps) {
  return (
    <section className="container">
      <div className="mb-[30px] flex flex-col justify-between gap-4 xl:flex-row">
        <Header
          description={faq.faq_description}
          subDescription={faq.faq_sub_description}
          hasContainer={false}
          lang={locale}
          inlineHeadings
          styles="mb-[30px] xl:w-[60%]"
        />
        {showCTA && <ActionLink content={faq.lets_talk} href="contact" />}
      </div>

      <Accordion content={faq.questions} />
    </section>
  );
}
