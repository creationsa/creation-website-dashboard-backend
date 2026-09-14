import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import HeaderForm from "../components/headerForm";
import { useHeader } from "../hooks/useHeader";

export default function Header() {
  const { t } = useTranslation();
  const { headerData, isHeaderLoading } = useHeader();

  if (isHeaderLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("header.header")} />

      <HeaderForm headerData={headerData} />
    </>
  );
}
