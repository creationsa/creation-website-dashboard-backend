import AddNewButton from "@/shared/components/addNewEntityButton";
import { resources } from "@/shared/components/addNewEntityButton/resources";
import { useLanguage } from "@/shared/hooks/useLanguage";
import NoDataMessage from "@/shared/ui/NoDataMessage";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import PagesGrid from "../components/pagesGrid";
import { usePages } from "../hooks/usePages";

export default function AllPagesPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  // const { pages, isPagesLoading } = usePages(currentLanguage);
  const { isPagesLoading } = usePages(currentLanguage);

  const pages = [
    {
      id: 1,
      title: "career",
    },
    {
      id: 2,
      title: "faq",
    },
  ];

  if (isPagesLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("pages.title")} />
      {!pages?.length ? (
        <NoDataMessage
          title={t("pages.no_page_title")}
          desc={t("pages.no_page_desc")}
        >
          <AddNewButton resource={resources.pages} />
        </NoDataMessage>
      ) : (
        <div>
          <AddNewButton resource={resources.pages} position="end" />

          <PagesGrid pages={pages} />
        </div>
      )}
    </>
  );
}
