import Spinner from "@/shared/ui/spinner/Spinner";
import SeoForm from "@/shared/components/seoForm";
import { useTranslation } from "react-i18next";
import PageTitle from "@/shared/ui/PageTitle";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";

export default function BlogSeoPage() {
  const { t } = useTranslation();
  const { seoData, isSeoLoading } = useGetSeoDataByModal("blogs");

  if (isSeoLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("general.seo_settings")} />

      <SeoForm seoData={seoData} forType="blogs" />
    </>
  );
}
