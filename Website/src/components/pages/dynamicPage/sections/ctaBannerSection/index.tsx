import { LanguageType } from "@/i18n.config";
import { CtaBannerContent } from "../../types";
import CTABox from "./CTABox";

interface CtaBannerSectionProps {
  content: CtaBannerContent;
  locale: LanguageType;
}

export default function CtaBannerSection({
  content,
  locale,
}: CtaBannerSectionProps) {
  return (
    <CTABox
      title={content.title}
      description={content.description}
      actionLabel={content.button_text}
      actionHref={`/${locale}/${content.button_slug}`}
    />
  );
}
