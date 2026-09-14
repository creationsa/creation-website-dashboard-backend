import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import BlogsMainDataForm from "../components/blogsMainDataForm";
import { useBlogsMainData } from "../hooks/useBlogsMainData";

export default function BlogsMainPage() {
  const { t } = useTranslation();
  const { blogsMainData, isBlogsMainDataLoading } = useBlogsMainData();

  if (isBlogsMainDataLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("blogs.blogs_main_page")} />

      <BlogsMainDataForm blogsMainDataToEdit={blogsMainData} />
    </>
  );
}
