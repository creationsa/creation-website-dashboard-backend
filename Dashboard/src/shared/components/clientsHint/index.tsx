import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import SectionPreview from "../sectionPreview";
import logosPreview from "./assets/logos.png";

interface ClientsHintProps {
  withBox?: boolean;
}

export default function ClientsHint({ withBox = true }: ClientsHintProps) {
  const { t } = useTranslation();

  const body = (
    <>
      <SectionPreview src={logosPreview} alt={t("pages.logos.logos_preview")} />

      <div className="flex flex-col items-center justify-center text-center">
        <p className="max-w-md text-sm text-gray-500">
          {t("general.placeholder_logos_hint")}
        </p>
      </div>
    </>
  );

  if (!withBox) {
    return <div className="flex flex-col gap-3 lg:gap-5">{body}</div>;
  }

  return (
    <Box
      title={t("general.placeholder_logos_title")}
      className="flex flex-col gap-3 border-2 border-dashed lg:gap-5"
    >
      {body}
    </Box>
  );
}
