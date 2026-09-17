import { LanguageType } from "@/i18n.config";
import { HeaderMenuItem } from "@/lib/api/getHeader";

export interface CopyrightItemsListProps {
  items: HeaderMenuItem[];
  locale: LanguageType;
  className?: string;
  onItemClick?: () => void;
}
