import Header from "@/components/ui/Header";
import { LanguageType } from "@/i18n.config";
import { HeaderContent } from "../types";

interface HeaderSectionProps {
  content: HeaderContent;
  locale: LanguageType;
}

export default function HeaderSection({ content, locale }: HeaderSectionProps) {
  return (
    <Header
      title={content.first_title}
      description={content.second_title || ""}
      subDescription={content.third_title}
      lang={locale}
    />
  );
}
