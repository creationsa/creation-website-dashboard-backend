import Accordion from "@/components/ui/Accordion";
import AccordionBlocks from "@/components/ui/AccordionBlocks";
import ActionLink from "@/components/ui/ActionLink";
import Header from "@/components/ui/Header";
import SmartMedia from "@/components/ui/SmartMedia";
import { LanguageType } from "@/i18n.config";
import { CustomAccordionSectionContent } from "../../types";

interface CustomAccordionSectionProps {
  content: CustomAccordionSectionContent;
  locale: LanguageType;
}

export default function CustomAccordionSection({
  content,
  locale,
}: CustomAccordionSectionProps) {
  return (
    <section className="container">
      <div
        className={`${content.layout_type === "with_media" ? "flex flex-col justify-between gap-5 md:flex-row" : "mb-[30px] flex flex-col justify-between gap-4 xl:flex-row"}`}
      >
        <Header
          title={content.first_title || ""}
          description={content.second_title || ""}
          subDescription={content.third_title}
          hasContainer={false}
          lang={locale}
          inlineHeadings={content.layout_type !== "with_media"}
          styles={`${content.layout_type === "with_media" ? "" : "mb-[30px] xl:w-[60%]"}`}
        />

        {content.layout_type === "with_button" &&
          content.action_button_text &&
          content.action_button_slug && (
            <ActionLink
              content={content.action_button_text}
              href={`/${locale}/${content.action_button_slug}`}
            />
          )}

        {content.layout_type === "with_media" && content.side_label && (
          <span className="mt-auto text-2xl font-semibold uppercase">
            {content.side_label}
          </span>
        )}
      </div>

      {content.layout_type === "with_media" && (
        <SmartMedia
          media={content.banner_media}
          alt={content.banner_media.alt || content.first_title || ""}
          containerClassName="relative my-10 aspect-video w-full md:aspect-21/9"
          className="h-full w-full object-cover"
          sizes="(min-width: 1280px) 1280px, 100vw"
        />
      )}

      <Accordion
        content={content.accordion_items.map((item) => ({
          title: item.title,
          description: <AccordionBlocks blocks={item.content_blocks} />,
        }))}
      />
    </section>
  );
}
