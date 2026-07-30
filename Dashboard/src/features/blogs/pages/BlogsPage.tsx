import AddNewButton from "@/shared/components/addNewEntityButton";
import { resources } from "@/shared/components/addNewEntityButton/resources";
import { useLanguage } from "@/shared/hooks/useLanguage";
import NoDataMessage from "@/shared/ui/NoDataMessage";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import BlogsGrid from "../components/BlogsGrid";
import { useBlogs } from "../hooks/useBlogs";

export default function BlogsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { blogs, isBlogsLoading } = useBlogs(currentLanguage);

  if (isBlogsLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("blogs.title")} />
      {!blogs?.length ? (
        <NoDataMessage
          title={t("blogs.no_blog_title")}
          desc={t("blogs.no_blog_desc")}
        >
          <AddNewButton resource={resources.blogs} />
        </NoDataMessage>
      ) : (
        <div>
          <AddNewButton resource={resources.blogs} position="end" />

          <BlogsGrid blogs={blogs} />
        </div>
      )}
    </>
  );
}
