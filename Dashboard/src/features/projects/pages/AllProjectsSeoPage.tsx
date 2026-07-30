import SeoForm from "@/shared/components/seoForm";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function AllProjectsSeoPage() {
  const { t } = useTranslation();
  const { seoData, isSeoLoading } = useGetSeoDataByModal("projects");

  if (isSeoLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("general.seo_settings")} />

      <SeoForm seoData={seoData} forType="projects" />
    </>
  );
}
