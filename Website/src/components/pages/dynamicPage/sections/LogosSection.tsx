import Clients from "@/components/common/clients";
import { getClients } from "@/components/common/clients/getClients";
import { LanguageType } from "@/i18n.config";

interface LogosSectionProps {
  locale: LanguageType;
}

export default async function LogosSection({ locale }: LogosSectionProps) {
  const data = await getClients(locale);

  return <Clients data={data} />;
}
