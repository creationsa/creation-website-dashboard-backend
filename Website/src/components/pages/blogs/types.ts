import { LanguageType } from "@/i18n.config";

export interface BlogsPageProps {
  params: Promise<{
    locale: LanguageType;
  }>;
}
