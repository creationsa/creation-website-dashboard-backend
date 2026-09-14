import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import SectionPreview from "../sectionPreview";
import contact from "./assets/contact.png";

interface ContactHintProps {
  withBox?: boolean;
}

export default function ContactHint({ withBox = true }: ContactHintProps) {
  const { t } = useTranslation();

  const body = (
    <>
      <SectionPreview
        src={contact}
        alt={t("pages.contact_section.contact_preview")}
      />

      <div className="flex flex-col items-center justify-center text-center">
        <p className="max-w-md text-sm text-gray-500">
          {t("pages.contact_section.placeholder_hint")}
        </p>
      </div>
    </>
  );

  if (!withBox) {
    return <div className="flex flex-col gap-3 lg:gap-5">{body}</div>;
  }

  return (
    <Box
      className="flex flex-col gap-3 border-2 border-dashed lg:gap-5"
      title={t("pages.contact_section.placeholder_title")}
    >
      {body}
    </Box>
  );
}
