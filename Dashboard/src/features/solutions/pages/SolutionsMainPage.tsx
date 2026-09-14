import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import MainSolutionsForm from "../components/mainSolutionsForm";
import { useSolutionsMainData } from "../hooks/useSolutionsMainData";

export default function SolutionsMainPage() {
  const { t } = useTranslation();

  const { solutionsMainData, isSolutionsMainDataLoading } =
    useSolutionsMainData();

  if (isSolutionsMainDataLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("solutions.solutions_main_page")} />

      <MainSolutionsForm solutionMainDataToEdit={solutionsMainData} />
    </>
  );
}
