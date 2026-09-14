import Header from "@/components/ui/Header";
import { LanguageType } from "@/i18n.config";
import SolutionItem from "./SolutionItem";
import { DisplayInfoContent } from "./types";

interface DisplayInfoSectionProps {
  content: DisplayInfoContent;
  locale: LanguageType;
}

export default function DisplayInfoSection({
  content,
  locale,
}: DisplayInfoSectionProps) {
  return (
    <section className="container">
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        lang={locale}
        hasContainer={false}
      />

      <div className="mt-10 flex flex-col gap-10">
        {content.blocks.map((block, index) => (
          <SolutionItem
            key={block.left.title}
            block={block}
            index={index}
            total={content.blocks.length}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
