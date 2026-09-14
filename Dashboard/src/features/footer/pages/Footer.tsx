import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import FooterForm from "../components/FooterForm";
import { useFooter } from "../hooks/useFooter";

export default function Footer() {
  const { t } = useTranslation();
  const { footerData, isFooterLoading } = useFooter();

  if (isFooterLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("footer.footer")} />

      <FooterForm footerData={footerData} />
    </>
  );
}
