import { LanguageType } from "@/i18n.config";

import ArchitectureBackground from "./ArchitectureBackground";
import ArchitectureCenterContent from "./ArchitectureCenterContent";
import ArchitectureCornerLabels from "./ArchitectureCornerLabels";
import { CultureIdentityContent } from "./types";

interface CultureIdentitySectionProps {
  content: CultureIdentityContent;
  locale: LanguageType;
}

export default function CultureIdentitySection({
  content,
  locale,
}: CultureIdentitySectionProps) {
  return (
    <>
      <section className="relative flex h-[60vh] w-full flex-col gap-10 overflow-x-hidden overflow-y-hidden sm:min-h-screen sm:flex-row sm:gap-0">
        <ArchitectureBackground
          media={content.culture_media}
          alt={content.culture_media.alt || content.center_title}
        />

        <ArchitectureCornerLabels
          topLeftText={content.top_left_text}
          topLeftSecondText={content.top_left_second_text}
          topRightText={content.top_right_text}
          topRightSecondText={content.top_right_second_text}
        />

        <ArchitectureCenterContent
          headline={content.center_title}
          description={content.center_description}
          logo={content.logo}
          locale={locale}
        />
      </section>
    </>
  );
}
