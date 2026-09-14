import Accordion from "@/components/ui/Accordion";
import AccordionBlocks from "@/components/ui/AccordionBlocks";
import Header from "@/components/ui/Header";
import { RichContentProps } from "./types";

export default function RichContent({ content, locale }: RichContentProps) {
  return (
    <div>
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        hasContainer={false}
        lang={locale}
      />

      {content.content_type === "description" && (
        <p className="mt-4 w-full sm:mt-8 sm:max-w-[80%]">
          {content.description}
        </p>
      )}

      {content.content_type === "accordion" && (
        <Accordion
          content={content.accordion_items.map((item) => ({
            title: item.title,
            description: <AccordionBlocks blocks={item.content_blocks} />,
          }))}
        />
      )}
    </div>
  );
}
