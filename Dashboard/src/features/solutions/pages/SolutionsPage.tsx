import AddNewButton from "@/shared/components/addNewEntityButton";
import { resources } from "@/shared/components/addNewEntityButton/resources";
import { useLanguage } from "@/shared/hooks/useLanguage";
import NoDataMessage from "@/shared/ui/NoDataMessage";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import MainSolutionsForm from "../components/mainSolutionsForm";
import SolutionsGrid from "../components/SolutionsGrid";
import { useSolutions } from "../hooks/useSolutions";
import { useSolutionsMainData } from "../hooks/useSolutionsMainData";

const solutions = [
  {
    id: 1,
    title: "test one",
    description: "kdaskdc askdsakd askdl kasl kdasl kdlas kdlkas sd",
    slug: "test-one",
    base_image: {
      id: 1,
      media: "https://www.creation.sa/images/home/creation-seo-en-cover.jpg",
      alt: "string",
      en: {
        alt: "ImageLocalization",
      },
      ar: {
        alt: "ImageLocalization",
      },
    },
  },
  {
    id: 2,
    title: "test two",
    description: "kdaskdc askdsakd askdl kasl kdasl kdlas kdlkas sd",
    slug: "test-two",
    base_image: {
      id: 1,
      media: "https://www.creation.sa/images/home/creation-seo-en-cover.jpg",
      alt: "string",
      en: {
        alt: "ImageLocalization",
      },
      ar: {
        alt: "ImageLocalization",
      },
    },
  },
];

export default function SolutionsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const {
    //  solutions,
    isSolutionsLoading,
  } = useSolutions(currentLanguage);

  const { solutionsMainData, isSolutionsMainDataLoading } =
    useSolutionsMainData();

  if (isSolutionsLoading || isSolutionsMainDataLoading)
    return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("solutions.title")} />
      {!solutions?.length ? (
        <NoDataMessage
          title={t("solutions.no_solution_title")}
          desc={t("solutions.no_solution_desc")}
        >
          <AddNewButton resource={resources.solutions} />
        </NoDataMessage>
      ) : (
        <div>
          <AddNewButton resource={resources.solutions} position="end" />

          <SolutionsGrid solutions={solutions} />
        </div>
      )}
      <MainSolutionsForm solutionMainDataToEdit={solutionsMainData} />
    </>
  );
}
